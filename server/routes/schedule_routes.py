from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from datetime import datetime

# Initialize Blueprint for modular route management
schedule_bp = Blueprint("schedule", __name__)

# Connect to MongoDB (Update with your MongoDB URI if needed)
client = MongoClient("mongodb://localhost:27017/")
db = client["kent_state"]
schedules_collection = db["schedules"]

# Function to validate chronological order of events
def is_valid_date_order(events, new_event):
    sorted_events = sorted(events, key=lambda e: datetime.strptime(e["date"], "%Y-%m-%d"))
    if sorted_events and datetime.strptime(new_event["date"], "%Y-%m-%d") < datetime.strptime(sorted_events[-1]["date"], "%Y-%m-%d"):
        return False  # New event date is earlier than the latest existing event
    return True

# 📌 Route: Add a Schedule Entry
@schedule_bp.route("/api/schedule/add", methods=["POST"])
def add_schedule():
    data = request.json

    # Ensure required fields are provided
    if not all(k in data for k in ["semester", "event", "date"]):
        return jsonify({"error": "Missing required fields: semester, event, or date"}), 400

    semester = data["semester"]
    new_event = {"event": data["event"], "date": data["date"]}

    # Fetch the semester entry from MongoDB
    semester_data = schedules_collection.find_one({"semester": semester})

    if semester_data:
        # Validate the date order
        if not is_valid_date_order(semester_data["events"], new_event):
            return jsonify({"error": "Invalid date order! Ensure events are added chronologically."}), 400
        
        # Add event to existing semester
        schedules_collection.update_one(
            {"semester": semester},
            {"$push": {"events": new_event}}
        )
    else:
        # If semester doesn't exist, create a new one
        schedules_collection.insert_one({"semester": semester, "events": [new_event]})

    return jsonify({"message": f"Event '{new_event['event']}' added successfully to {semester}"}), 201

# 📌 Route: Get Schedules by Semester
@schedule_bp.route("/api/schedule/<semester>", methods=["GET"])
def get_schedule(semester):
    semester_data = schedules_collection.find_one({"semester": semester})
    if not semester_data:
        return jsonify({"error": f"No schedule found for {semester}"}), 404

    return jsonify({"semester": semester_data["semester"], "events": semester_data["events"]}), 200

# 📌 Route: Get All Schedules
@schedule_bp.route("/api/schedule/all", methods=["GET"])
def get_all_schedules():
    schedules = list(schedules_collection.find({}, {"_id": 0}))  # Exclude MongoDB's default `_id` field
    return jsonify(schedules), 200
