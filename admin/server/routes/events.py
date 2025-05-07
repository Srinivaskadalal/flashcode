from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from models.database import events_collection
from bson import ObjectId
from urllib.parse import urlparse
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

bp = Blueprint("events_blueprint", __name__, url_prefix="/events")  # Change name to 'events_blueprint'


### 🔹 GET: Fetch Upcoming Events
@bp.route("/", methods=["GET"])
def get_upcoming_events():
    """Retrieve upcoming events within the next 30 days."""
    today = datetime.now().strftime("%Y-%m-%d")
    next_30_days = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")

    try:
        events = list(events_collection.find(
            {"date": {"$gte": today, "$lte": next_30_days}},
            {"title": 1, "date": 1, "time": 1, "description": 1, "location": 1, "link": 1}
        ))

        # Convert MongoDB ObjectId to string
        for event in events:
            event["_id"] = str(event["_id"])

        return jsonify(events), 200
    except Exception as e:
        logging.error(f"Database error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


### 🔹 GET: Fetch a Single Event by ID
@bp.route("/<event_id>", methods=["GET"])
def get_event(event_id):
    """Retrieve a single event by ID."""
    try:
        obj_id = ObjectId(event_id)
        event = events_collection.find_one(
            {"_id": obj_id},
            {"_id": 1, "title": 1, "date": 1, "time": 1, "description": 1, "location": 1, "link": 1}
        )

        if not event:
            return jsonify({"error": "Event not found"}), 404

        event["_id"] = str(event["_id"])  # Convert ObjectId to string
        return jsonify(event), 200

    except:
        return jsonify({"error": "Invalid event ID"}), 400


### 🔹 POST: Create a New Event
@bp.route("/post", methods=["POST"])
def add_event():
    """Add a new event."""
    data = request.json
    required_fields = ["title", "date", "time", "description", "location", "link"]

    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing fields"}), 400

    # Validate date and time format
    try:
        datetime.strptime(data["date"], "%Y-%m-%d")
        datetime.strptime(data["time"], "%I:%M %p")  # Example: "10:30 AM"
    except ValueError:
        return jsonify({"error": "Invalid date or time format"}), 400

    # Validate URL format
    if not urlparse(data["link"]).scheme:
        return jsonify({"error": "Invalid link format"}), 400

    try:
        result = events_collection.insert_one(data)
        return jsonify({"message": "Event added successfully!", "event_id": str(result.inserted_id)}), 201
    except Exception as e:
        logging.error(f"Database error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


### 🔹 PUT: Update an Existing Event
@bp.route("/update/<event_id>", methods=["PUT"])
def update_event(event_id):
    """Update an existing event."""
    data = request.json  # Get updated event data

    try:
        obj_id = ObjectId(event_id)  # Convert event_id to ObjectId
    except:
        return jsonify({"error": "Invalid event ID"}), 400

    # Allow only specific fields to be updated
    allowed_fields = {"title", "date", "time", "description", "location", "link"}
    update_data = {key: data[key] for key in data if key in allowed_fields}

    if not update_data:
        return jsonify({"error": "No valid fields to update"}), 400

    try:
        result = events_collection.update_one({"_id": obj_id}, {"$set": update_data})

        if result.matched_count == 0:
            return jsonify({"error": "Event not found"}), 404

        # Fetch and return the updated event
        updated_event = events_collection.find_one({"_id": obj_id}, {"_id": 1, **{field: 1 for field in allowed_fields}})
        updated_event["_id"] = str(updated_event["_id"])

        return jsonify({"message": "Event updated successfully!", "updated_event": updated_event}), 200

    except Exception as e:
        logging.error(f"Database error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


### 🔹 DELETE: Remove an Event
@bp.route("/delete/<event_id>", methods=["DELETE"])
def delete_event(event_id):
    """Delete an event."""
    try:
        obj_id = ObjectId(event_id)
    except:
        return jsonify({"error": "Invalid event ID"}), 400

    try:
        result = events_collection.delete_one({"_id": obj_id})

        if result.deleted_count == 0:
            return jsonify({"error": "Event not found"}), 404

        return jsonify({"message": "Event deleted successfully!"}), 200

    except Exception as e:
        logging.error(f"Database error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
