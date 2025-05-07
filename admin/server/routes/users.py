from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
from models.database import users_collection,answers_collection,questions_collection
from bson import ObjectId

bp = Blueprint("users_blueprint", __name__, url_prefix="/users")

# Total Users API (Basic)
@bp.route("/total", methods=["GET"])
def get_total_users():
    try:
        total_users = users_collection.count_documents({})
        return jsonify({"total_users": total_users}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Total Users Added Today API
@bp.route("/total_today", methods=["GET"])
def get_total_users_today():
    try:
        today = datetime.utcnow().date()
        total_users_today = users_collection.count_documents({
            "created_at": {
                "$gte": datetime(today.year, today.month, today.day),
                "$lt": datetime(today.year, today.month, today.day) + timedelta(days=1)
            }
        })
        return jsonify({"total_users_today": total_users_today}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Users By Month API
@bp.route("/users_by_month", methods=["GET"])
def get_users_by_month():
    try:
        current_year = datetime.utcnow().year
        month_names = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        pipeline = [
            {"$match": {"created_at": {"$gte": datetime(current_year, 1, 1), "$lt": datetime(current_year + 1, 1, 1)}}},
            {"$group": {"_id": {"$month": "$created_at"}, "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}}
        ]

        users_by_month = list(users_collection.aggregate(pipeline))

        data = {i + 1: 0 for i in range(12)}
        for month_data in users_by_month:
            data[month_data["_id"]] = month_data["count"]

        result = [{"month": month_names[month - 1], "count": data[month]} for month in range(1, 13)]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Total Users with Trend API
@bp.route("/total_users_trend", methods=["GET"])
def get_total_users_with_trend():
    """Fetch total users, percentage change, and trend for the frontend dashboard."""
    try:
        # Get the total number of users
        total_users = users_collection.count_documents({})

        # Get the first day of the current and last month
        today = datetime.utcnow()
        first_day_this_month = datetime(today.year, today.month, 1)
        first_day_last_month = first_day_this_month - timedelta(days=1)
        first_day_last_month = datetime(first_day_last_month.year, first_day_last_month.month, 1)

        # Count users created this month and last month
        this_month_users = users_collection.count_documents({"createdAt": {"$gte": first_day_this_month}})
        last_month_users = users_collection.count_documents({
            "createdAt": {"$gte": first_day_last_month, "$lt": first_day_this_month}
        })

        # Fix: Handle case where last_month_users == 0
        if last_month_users == 0:
            change_percent = 100 if this_month_users > 0 else 0
        else:
            change_percent = ((this_month_users - last_month_users) / last_month_users) * 100

        # Determine trend & icon
        if change_percent > 0:
            trend = "Growing community"
            icon = "up"
            subtext = f"Total users increased by {change_percent:.1f}% compared to last month!"
        elif change_percent < 0:
            trend = "User drop detected"
            icon = "down"
            subtext = f"Total users decreased by {abs(change_percent):.1f}% from last month."
        else:
            trend = "No significant change"
            icon = "neutral"
            subtext = "User growth remained stable this month."

        return jsonify({
            "total_users": total_users,
            "change": f"{change_percent:.1f}%",
            "trend": trend,
            "subtext": subtext,  # ✅ Dynamic Subtitle
            "icon": icon
        }), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

    """Fetch total users, percentage change, and trend for the frontend dashboard."""
    try:
        # Get the total number of users
        total_users = users_collection.count_documents({})

        # Get the first day of the current and last month
        today = datetime.utcnow()
        first_day_this_month = datetime(today.year, today.month, 1)
        first_day_last_month = first_day_this_month - timedelta(days=1)
        first_day_last_month = datetime(first_day_last_month.year, first_day_last_month.month, 1)

        # Count users created this month and last month
        this_month_users = users_collection.count_documents({"createdAt": {"$gte": first_day_this_month}})
        last_month_users = users_collection.count_documents({
            "createdAt": {"$gte": first_day_last_month, "$lt": first_day_this_month}
        })

        # Fix: Handle case where last_month_users == 0
        if last_month_users == 0:
            change_percent = 100 if this_month_users > 0 else 0
        else:
            change_percent = ((this_month_users - last_month_users) / last_month_users) * 100

        # Determine trend & icon
        if change_percent > 0:
            trend = "Growing community"
            icon = "up"
        elif change_percent < 0:
            trend = "User drop detected"
            icon = "down"
        else:
            trend = "No significant change"
            icon = "neutral"

        return jsonify({
            "total_users": total_users,
            "change": f"{change_percent:.1f}%",
            "trend": trend,
            "subtext": "Total registered users on Flashcode",
            "icon": icon
        }), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500



# Leaderboard API

@bp.route("/leaderboard", methods=["GET"])
def get_leaderboard():
    try:
        range_param = request.args.get("range", "today")

        today = datetime.utcnow()
        start_date = None  # Default: No filtering

        # ✅ Define filtering logic for different ranges
        if range_param == "today":
            start_date = datetime(today.year, today.month, today.day)
        elif range_param == "30days":
            start_date = today - timedelta(days=30)
        elif range_param == "pastyear":
            start_date = today - timedelta(days=365)

        # ✅ MongoDB aggregation pipeline with correct lookup
        pipeline = [
            {
                "$lookup": {
                    "from": "answers",
                    "let": {"user_id": "$_id"},
                    "pipeline": [
                        {
                            "$match": {
                                "$expr": {"$eq": ["$author", "$$user_id"]},  # Match `_id` from users to `author` in answers
                                **({"createdAt": {"$gte": start_date}} if start_date else {})
                            }
                        }
                    ],
                    "as": "user_answers"
                }
            },
            {
                "$addFields": {
                    "questionsAnswered": {"$size": "$user_answers"},
                    "lastActive": {"$max": "$user_answers.createdAt"}  # Get the latest answer date
                }
            },
            {
                "$project": {
                    "name": 1,
                    "email": 1,
                    "createdAt": 1,
                    "questionsAnswered": 1,
                    "lastActive": {
                        "$dateToString": {
                            "format": "%m/%d/%Y",
                            "date": "$lastActive"
                        }
                    },
                    "accountAge": {
                        "$divide": [
                            {"$subtract": [today, "$createdAt"]},
                            1000 * 60 * 60 * 24  # Convert ms to days
                        ]
                    }
                }
            },
            {"$sort": {"questionsAnswered": -1}},  # Sort users by answers count (descending)
            {"$limit": 10}  # Limit the results to top 10 users
        ]

        users = list(users_collection.aggregate(pipeline))

        # ✅ Prepare the response
        leaderboard = []
        for rank, user in enumerate(users, start=1):
            user_data = {
                "rank": rank,
                "name": user.get("name", "Unknown"),
                "email": user.get("email", "N/A"),
                "questionsAnswered": user["questionsAnswered"],
                "accountAge": int(user["accountAge"]) if "accountAge" in user else 0,
                "lastActive": user["lastActive"] if user["lastActive"] else "N/A"
            }
            leaderboard.append(user_data)

        return jsonify(leaderboard), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


#  activity summary @bp.route("/activity_summary", methods=["GET"])
@bp.route("/activity_summary", methods=["GET"])
def get_activity_summary():
    """Fetch total users and active users in the past 30 days."""
    try:
        # ✅ Get total registered users
        total_users = users_collection.count_documents({})

        # ✅ Get active users (posted a question or answer in the last 30 days)
        last_30_days = datetime.utcnow() - timedelta(days=30)
        active_users = users_collection.count_documents({
            "$or": [
                {"created_at": {"$gte": last_30_days}},  # ✅ User registered recently
                {"email": {"$in": answers_collection.distinct("author", {"created_at": {"$gte": last_30_days}})}}
            ]
        })

        return jsonify({
            "total_users": total_users,
            "active_users": active_users
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    """Fetch total users and active users in the past 30 days."""
    try:
        # ✅ Get total registered users
        total_users = users_collection.count_documents({})

        # ✅ Get active users (posted a question or answer in the last 30 days)
        last_30_days = datetime.utcnow() - timedelta(days=30)
        active_users = users_collection.count_documents({"lastActive": {"$gte": last_30_days}})

        return jsonify({
            "total_users": total_users,
            "active_users": active_users
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


#  Fetch All

@bp.route("/all", methods=["GET"])
def get_all_users():
    try:
        users = list(users_collection.find({}, {"_id": 1, "name": 1, "email": 1, "username": 1, "createdAt": 1}))
        
        user_data = []
        for user in users:
            user_id = str(user["_id"])

            # Count total questions by user
            total_questions = questions_collection.count_documents({"author": ObjectId(user_id)})

            # Count total answers by user
            total_answers = answers_collection.count_documents({"author": ObjectId(user_id)})

            user_data.append({
                "id": user_id,
                "name": user.get("name", ""),
                "email": user.get("email", ""),
                "username": user.get("username", ""),
                "createdDate": user["createdAt"].strftime("%Y-%m-%d") if "createdAt" in user else "",
                "totalQuestions": total_questions,
                "numberOfAnswers": total_answers,
            })

        return jsonify(user_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
