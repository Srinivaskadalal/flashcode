from flask import Blueprint, request, jsonify
from flask_cors import CORS
from datetime import datetime
from models.database import important_dates_collection
from bson import ObjectId

# ✅ Add `url_prefix`
important_dates_bp = Blueprint("important_dates", __name__, url_prefix="/api/important-dates")
CORS(important_dates_bp)

@important_dates_bp.route("/add", methods=["POST"])
def add_important_date():
    try:
        data = request.json
        print("🔹 Received Data:", data)  # ✅ Debugging

        event_name = data.get("event")
        event_date = data.get("date")
        semester = data.get("semester")

        if not event_name or not event_date or not semester:
            return jsonify({"error": "Event name, date, and semester are required"}), 400

        # ✅ Fix: Convert date properly
        try:
            event_datetime = datetime.strptime(event_date, "%a %b %d %Y")  # ✅ Fix date format
        except ValueError as ve:
            return jsonify({"error": f"Invalid date format: {str(ve)}"}), 400  # ✅ Return error

        new_event = {
            "event": event_name,
            "date": event_datetime,
            "semester": semester,
            "createdAt": datetime.utcnow(),
        }

        result = important_dates_collection.insert_one(new_event)
        print("✅ Inserted ID:", result.inserted_id)  # ✅ Debugging

        return jsonify({"message": "Important date added successfully"}), 201

    except Exception as e:
        print("❌ Error:", str(e))  # ✅ Print Full Error
        return jsonify({"error": f"Failed to add important date: {str(e)}"}), 500

@important_dates_bp.route("/all", methods=["GET"])
def get_important_dates():
    try:
        events = list(important_dates_collection.find().sort("date", 1))  # Sorted by date ascending

        formatted_events = [
            {
                "id": str(event["_id"]),
                "event": event.get("event", ""),
                "date": event["date"].strftime("%Y-%m-%d"),
                "semester": event.get("semester", ""),
                "createdAt": event.get("createdAt", datetime.utcnow()).strftime("%Y-%m-%d"),
            }
            for event in events
        ]

        return jsonify({"events": formatted_events}), 200

    except Exception as e:
        print("❌ Error fetching events:", str(e))
        return jsonify({"error": f"Failed to fetch important dates: {str(e)}"}), 500


#  new
@important_dates_bp.route("/semester-wise", methods=["GET"])
def get_important_dates_semester_wise():
    try:
        all_dates = list(important_dates_collection.find({}))
        
        def parse_date(item):
            return datetime.strptime(item["date"], "%Y-%m-%d") if isinstance(item["date"], str) else item["date"]

        spring = []
        summer = []
        fall = []

        for item in all_dates:
            date_obj = parse_date(item)
            semester = item.get("semester", "").lower()

            event_data = {
                "id": str(item["_id"]),  # ✅ Include ID for frontend
                "event": item["event"],
                "date": date_obj,
                "semester": item["semester"],
            }

            if "spring" in semester:
                spring.append(event_data)
            elif "summer" in semester:
                summer.append(event_data)
            elif "fall" in semester:
                fall.append(event_data)

        return jsonify({
            "spring": sorted(spring, key=lambda x: x["date"]),
            "summer": sorted(summer, key=lambda x: x["date"]),
            "fall": sorted(fall, key=lambda x: x["date"]),
        }), 200

    except Exception as e:
        print("❌ Error:", str(e))
        return jsonify({"error": str(e)}), 500

    try:
        all_dates = list(important_dates_collection.find({}))
        
        def parse_date(item):
            return datetime.strptime(item["date"], "%Y-%m-%d") if isinstance(item["date"], str) else item["date"]

        spring = []
        summer = []
        fall = []

        for item in all_dates:
            date_obj = parse_date(item)
            semester = item.get("semester", "").lower()

            event_data = {
                "event": item["event"],
                "date": date_obj,
                "semester": item["semester"],
            }

            if "spring" in semester:
                spring.append(event_data)
            elif "summer" in semester:
                summer.append(event_data)
            elif "fall" in semester:
                fall.append(event_data)

        return jsonify({
            "spring": sorted(spring, key=lambda x: x["date"]),
            "summer": sorted(summer, key=lambda x: x["date"]),
            "fall": sorted(fall, key=lambda x: x["date"]),
        }), 200

    except Exception as e:
        print("❌ Error:", str(e))
        return jsonify({"error": str(e)}), 500


#delete 

@important_dates_bp.route("/delete/<id>", methods=["DELETE"])
def delete_important_date(id):
    try:
        result = important_dates_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return jsonify({"message": "Deleted successfully"}), 200
        return jsonify({"error": "Event not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
