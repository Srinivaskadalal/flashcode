from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from models.database import questions_collection, answers_collection
from collections import defaultdict

analytics_bp = Blueprint("analytics", __name__)

def format_date(date_obj, time_range):
    """Formats the date for grouping: daily (week/month) or monthly (year)."""
    return date_obj.strftime("%Y-%m-%d") if time_range in ["week", "month"] else date_obj.strftime("%Y-%m")

def generate_date_range(start_date, end_date, time_range):
    """Generates a full list of dates (daily for week/month, monthly for year)."""
    dates = []
    current = start_date

    while current <= end_date:
        dates.append(format_date(current, time_range))
        if time_range in ["week", "month"]:
            current += timedelta(days=1)  # Daily steps
        else:
            current = (current.replace(day=1) + timedelta(days=32)).replace(day=1)  # Monthly steps

    return dates

@analytics_bp.route("/api/analytics/questions-answers", methods=["GET"])
def get_questions_answers():
    time_range = request.args.get("range", "month")  # Default to 'month'

    today = datetime.utcnow()
    if time_range == "week":
        start_date = today - timedelta(days=7)
    elif time_range == "month":
        start_date = today - timedelta(days=30)
    elif time_range == "year":
        start_date = today - timedelta(days=365)
    else:
        return jsonify({"error": "Invalid time range. Use 'week', 'month', or 'year'."}), 400

    # Get all possible dates for the time range
    all_dates = generate_date_range(start_date, today, time_range)

    # Initialize trend data with 0 counts
    trend_data = {date: {"questions": 0, "answers": 0} for date in all_dates}

    # Fetch & Group Questions by Date
    questions = questions_collection.find({"createdAt": {"$gte": start_date}}, {"createdAt": 1})
    for q in questions:
        formatted_date = format_date(q["createdAt"], time_range)
        if formatted_date in trend_data:
            trend_data[formatted_date]["questions"] += 1

    # Fetch & Group Answers by Date
    answers = answers_collection.find({"createdAt": {"$gte": start_date}}, {"createdAt": 1})
    for a in answers:
        formatted_date = format_date(a["createdAt"], time_range)
        if formatted_date in trend_data:
            trend_data[formatted_date]["answers"] += 1

    # Convert trend_data dict to sorted list
    sorted_trend_data = [{"date": date, **trend_data[date]} for date in sorted(trend_data.keys())]

    return jsonify({
        "time_range": time_range,
        "trend_data": sorted_trend_data
    })

@analytics_bp.route("/api/views/trend", methods=["GET"])
def get_views_trend():
    try:
        # ✅ Get Time Range from Query Parameter (default: "week")
        time_range = request.args.get("range", "week")  # Options: "week", "month", "year"

        # ✅ Define Start Date Based on User Selection
        now = datetime.utcnow()
        if time_range == "week":
            days_back = 7
        elif time_range == "month":
            days_back = 30
        elif time_range == "year":
            days_back = 365
        else:
            return jsonify({"error": "Invalid time range"}), 400

        start_date = now - timedelta(days=days_back)

        # ✅ Aggregate Views per Day from MongoDB
        pipeline = [
            {"$match": {"createdAt": {"$gte": start_date}}},  # Filter by date range
            {
                "$group": {
                    "_id": {
                        "year": {"$year": "$createdAt"},
                        "month": {"$month": "$createdAt"},
                        "day": {"$dayOfMonth": "$createdAt"}
                    },
                    "total_views": {"$sum": "$views"}  # ✅ Sum views per day
                }
            },
            {"$sort": {"_id.year": 1, "_id.month": 1, "_id.day": 1}}  # Sort by date
        ]

        trend_data = list(questions_collection.aggregate(pipeline))

        # ✅ Convert MongoDB Output to Dictionary Format
        views_dict = {
            f"{data['_id']['year']}-{str(data['_id']['month']).zfill(2)}-{str(data['_id']['day']).zfill(2)}": data["total_views"]
            for data in trend_data
        }

        # ✅ Fill Missing Dates with `0`
        response_data = []
        for i in range(days_back):
            date = (start_date + timedelta(days=i)).strftime("%Y-%m-%d")
            response_data.append({"date": date, "views": views_dict.get(date, 0)})  # Default to 0 if missing

        return jsonify({"trend_data": response_data}), 200

    except Exception as e:
        return jsonify({"error": f"Failed to fetch views trend: {str(e)}"}), 500