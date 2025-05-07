
from flask import Blueprint, jsonify
from datetime import datetime, timedelta
from models.database import questions_collection 
from models.database import users_collection
from models.database import answers_collection

# Create a unique blueprint for questions
bp = Blueprint("questions_blueprint", __name__, url_prefix="/questions")

# ✅ 1️⃣ Route to get only the **total number of questions** (no trend)
@bp.route("/total_count", methods=["GET"])
def get_total_questions_count():
    """Fetch only the total number of questions in the MongoDB database."""
    try:
        total_questions = questions_collection.count_documents({})
        return jsonify({"total_questions_count": total_questions}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# ✅ 2️⃣ Route to get **total questions with trend and change %**
@bp.route("/total_questions_trend", methods=["GET"])
def get_total_questions_with_trend():
    """Fetch total questions, percentage change, and trend for the frontend dashboard."""
    try:
        # Get the total number of questions
        total_questions = questions_collection.count_documents({})

        # Get the first day of the current and last month
        today = datetime.utcnow()
        first_day_this_month = datetime(today.year, today.month, 1)
        first_day_last_month = first_day_this_month - timedelta(days=1)
        first_day_last_month = datetime(first_day_last_month.year, first_day_last_month.month, 1)

        # Count questions created this month and last month
        this_month_questions = questions_collection.count_documents({"createdAt": {"$gte": first_day_this_month}})
        last_month_questions = questions_collection.count_documents({
            "createdAt": {"$gte": first_day_last_month, "$lt": first_day_this_month}
        })

        # Handle division by zero when last month has 0 questions
        if last_month_questions == 0:
            change_percent = 100 if this_month_questions > 0 else 0
        else:
            change_percent = ((this_month_questions - last_month_questions) / last_month_questions) * 100

        # Determine trend & icon
        if change_percent > 0:
            trend = "More questions posted"
            icon = "up"
            subtext = f"Total questions increased by {change_percent:.1f}% compared to last month!"
        elif change_percent < 0:
            trend = "Declining question activity"
            icon = "down"
            subtext = f"Total questions decreased by {abs(change_percent):.1f}% from last month."
        else:
            trend = "No significant change"
            icon = "neutral"
            subtext = "Question activity remained stable this month."

        return jsonify({
            "total_questions": total_questions,
            "change": f"{change_percent:.1f}%",
            "trend": trend,
            "subtext": subtext,  # ✅ Dynamic Subtitle
            "icon": icon
        }), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# ✅ 3️⃣ Route to get **questions by month**
@bp.route("/questions_by_month", methods=["GET"])
def get_questions_by_month():
    """Fetch the number of questions posted each month for the current year."""
    try:
        # Get the current date
        current_date = datetime.utcnow()
        current_year = current_date.year

        # Define month names for better readability
        month_names = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        # Aggregation pipeline to group by month and count questions
        pipeline = [
            # Step 1: Match documents for the current year
            {
                "$match": {
                    "createdAt": {
                        "$gte": datetime(current_year, 1, 1),  # Start of this year
                        "$lt": datetime(current_year + 1, 1, 1)  # Start of next year
                    }
                }
            },
            # Step 2: Group by month and count the number of questions
            {
                "$group": {
                    "_id": {
                        "$month": "$createdAt"  # Group by month of creation
                    },
                    "count": {"$sum": 1}  # Count number of questions per month
                }
            },
            # Step 3: Sort by month
            {
                "$sort": {"_id": 1}  # Sort by month in ascending order
            }
        ]

        # Execute the aggregation query
        questions_by_month = list(questions_collection.aggregate(pipeline))

        # Initialize dictionary with all months (to ensure missing months are 0)
        data = {i + 1: 0 for i in range(12)}  # Default count = 0 for all months

        # Fill dictionary with actual data from MongoDB
        for month_data in questions_by_month:
            month = month_data["_id"]
            data[month] = month_data["count"]

        # Convert data into frontend format
        result = [{"month": month_names[month - 1], "count": data[month]} for month in range(1, 13)]

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


#  all 

@bp.route("/all", methods=["GET"])
def get_all_questions():
    try:
        questions = list(questions_collection.find({}, {
            "_id": 1,
            "title": 1,
            "answers": 1,
            "author": 1,
            "upvotes": 1,
            "downvotes": 1,
        }))

        question_data = []
        for i, question in enumerate(questions, start=1):
            question_id = str(question["_id"])
            author_id = question.get("author")
            author_name = "Unknown"

            if author_id:
                user = users_collection.find_one({"_id": author_id}, {"name": 1})
                if user and user.get("name"):
                    author_name = user["name"]

            question_data.append({
                "id": question_id,
                "sNo": f"Q{i:03}",
                "question": question.get("title", ""),
                "answers": question.get("answers", 0),
                "createdBy": author_name,
                "upvotes": question.get("upvotes", 0),
                "downvotes": question.get("downvotes", 0),
            })

        return jsonify(question_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
