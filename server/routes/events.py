from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from database import events_collection
from bson import ObjectId

bp = Blueprint("events", __name__, url_prefix="/events")

#  Get Upcoming Events (Next 30 Days)
@bp.route("/", methods=["GET"])
def get_upcoming_events():
    today = datetime.now().strftime("%Y-%m-%d")
    next_30_days = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")

    events = list(events_collection.find(
        {"date": {"$gte": today, "$lte": next_30_days}}, 
        {"_id": 0}  
    ))

    return jsonify(events), 200

#  Add a New Event
@bp.route("/post", methods=["POST"])
def add_event():
    data = request.json

    required_fields = ["title", "date", "time", "description", "location", "link"]
    
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing fields"}), 400

    try:
        datetime.strptime(data["date"], "%Y-%m-%d")
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

    try:
        datetime.strptime(data["time"], "%I:%M %p")
    except ValueError:
        return jsonify({"error": "Invalid time format. Use HH:MM AM/PM (e.g., 06:30 PM)"}), 400

    from urllib.parse import urlparse
    if not urlparse(data["link"]).scheme:
        return jsonify({"error": "Invalid link format"}), 400

    events_collection.insert_one(data)
    return jsonify({"message": "Event added successfully!"}), 201


# Update
@bp.route("/<event_id>", methods=["PUT"])
def update_event(event_id):
    data = request.json

    required_fields = ["title", "date", "time", "description", "location", "link"]
    
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing fields"}), 400

    try:
        datetime.strptime(data["date"], "%Y-%m-%d")
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

    try:
        datetime.strptime(data["time"], "%I:%M %p")
    except ValueError:
        return jsonify({"error": "Invalid time format. Use HH:MM AM/PM (e.g., 06:30 PM)"}), 400

    from urllib.parse import urlparse
    if not urlparse(data["link"]).scheme:
        return jsonify({"error": "Invalid link format"}), 400

    result = events_collection.update_one({"_id": ObjectId(event_id)}, {"$set": data})

    if result.matched_count == 0:
        return jsonify({"error": "Event not found"}), 404

    return jsonify({"message": "Event updated successfully!"}), 200
