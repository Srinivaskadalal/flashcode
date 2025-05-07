from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
from models.database import db  # Import the database connection
from models.database import questions_collection, answers_collection




# Create a unique blueprint for answers
bp = Blueprint("answers_blueprint", __name__, url_prefix="/answers")


# ✅ 1️⃣ Get Total Number of Answers
@bp.route("/total_count", methods=["GET"])
def get_total_answers_count():
    """Fetch only the total number of answers in the MongoDB database."""
    try:
        total_answers = answers_collection.count_documents({})
        return jsonify({"total_answers_count": total_answers}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# ✅ 2️⃣ Get Total Answers Trend (Change % from Last Month)
@bp.route("/total_answers_trend", methods=["GET"])
def get_total_answers_with_trend():
    """Fetch total answers, percentage change, and trend for the frontend dashboard."""
    try:
        total_answers = answers_collection.count_documents({})

        today = datetime.utcnow()
        first_day_this_month = datetime(today.year, today.month, 1)
        first_day_last_month = first_day_this_month - timedelta(days=1)
        first_day_last_month = datetime(first_day_last_month.year, first_day_last_month.month, 1)

        this_month_answers = answers_collection.count_documents({"createdAt": {"$gte": first_day_this_month}})
        last_month_answers = answers_collection.count_documents({
            "createdAt": {"$gte": first_day_last_month, "$lt": first_day_this_month}
        })

        if last_month_answers == 0:
            change_percent = 100 if this_month_answers > 0 else 0
        else:
            change_percent = ((this_month_answers - last_month_answers) / last_month_answers) * 100

        # Determine trend & icon
        if change_percent > 0:
            trend = "More answers posted"
            icon = "up"
            subtext = f"Total answers increased by {change_percent:.1f}% compared to last month!"
        elif change_percent < 0:
            trend = "Declining answer activity"
            icon = "down"
            subtext = f"Total answers decreased by {abs(change_percent):.1f}% from last month."
        else:
            trend = "No significant change"
            icon = "neutral"
            subtext = "Answer activity remained stable this month."

        return jsonify({
            "total_answers": total_answers,
            "change": f"{change_percent:.1f}%",
            "trend": trend,
            "subtext": subtext,  # ✅ Dynamic Subtitle
            "icon": icon
        }), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# ✅ 3️⃣ Get Answers Count By Month
@bp.route("/answers_by_month", methods=["GET"])
def get_answers_by_month():
    """Fetch the number of answers posted each month for the current year."""
    try:
        current_year = datetime.utcnow().year
        month_names = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        pipeline = [
            {"$match": {"createdAt": {"$gte": datetime(current_year, 1, 1), "$lt": datetime(current_year + 1, 1, 1)}}},
            {"$group": {"_id": {"$month": "$createdAt"}, "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}}
        ]

        answers_by_month = list(answers_collection.aggregate(pipeline))
        data = {i + 1: 0 for i in range(12)}

        for month_data in answers_by_month:
            month = month_data["_id"]
            data[month] = month_data["count"]

        result = [{"month": month_names[month - 1], "count": data[month]} for month in range(1, 13)]
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# ✅ 4️⃣ Get Answers for a Specific Question
@bp.route("/by_question/<question_id>", methods=["GET"])
def get_answers_for_question(question_id):
    """Fetch all answers for a given question."""
    try:
        answers = list(answers_collection.find({"question": question_id}, {"_id": 0, "content": 1, "author": 1, "createdAt": 1}))
        return jsonify(answers), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


#ANSWER_RATE
# @bp.route("/answer_rate", methods=["GET"])
# def get_answer_rate():
#     """Fetch the percentage of questions that have at least one answer and include unanswered question count in the title."""
#     try:
#         # Get total number of questions
#         total_questions = questions_collection.count_documents({})

#         # Get count of questions that have at least one answer
#         answered_questions = answers_collection.distinct("question")  # Get unique question IDs
#         answered_count = len(answered_questions)

#         # Calculate unanswered questions
#         unanswered_count = total_questions - answered_count

#         # Calculate answer rate
#         answer_rate = (answered_count / total_questions * 100) if total_questions > 0 else 0

#         # ✅ Modify subtext based on answer rate percentage
#         if answer_rate < 50:
#             subtext = f"{unanswered_count} questions remain unanswered, improvement needed!"
#         elif 50 <= answer_rate < 75:
#             subtext = f"{unanswered_count} questions need answers, engagement is moderate."
#         else:
#             subtext = "Great community response rate!"

#         # ✅ Modify icon based on answer rate
#         icon = "up" if answer_rate >= 50 else "down"

#         return jsonify({
#             "answer_rate": f"{answer_rate:.1f}%",
#             "total_questions": total_questions,
#             "answered_questions": answered_count,
#             "unanswered_questions": unanswered_count,  # ✅ Added to title
#             "subtext": subtext,
#             "icon": icon
#         }), 200

#     except Exception as e:
#         return jsonify({"error": f"An error occurred: {str(e)}"}), 500

#     """Fetch the percentage of questions that have at least one answer and assign a meaningful subtext."""
#     try:
#         # Get total number of questions
#         total_questions = questions_collection.count_documents({})

#         # Get count of questions that have at least one answer
#         answered_questions = answers_collection.distinct("question")  # Get unique question IDs
#         answered_count = len(answered_questions)

#         # Calculate answer rate
#         answer_rate = (answered_count / total_questions * 100) if total_questions > 0 else 0

#         # ✅ Modify subtext based on answer rate percentage
#         if answer_rate < 50:
#             subtext = "Many questions remain unanswered, improvement needed!"
#         elif 50 <= answer_rate < 75:
#             subtext = "Moderate engagement, but there's room to grow."
#         else:
#             subtext = "Great community response rate!"

#         # ✅ Modify icon based on answer rate
#         icon = "up" if answer_rate >= 50 else "down"

#         return jsonify({
#             "answer_rate": f"{answer_rate:.1f}%",
#             "total_questions": total_questions,
#             "answered_questions": answered_count,
#             "subtext": subtext,
#             "icon": icon
#         }), 200

#     except Exception as e:
#         return jsonify({"error": f"An error occurred: {str(e)}"}), 500
#     """Fetch the percentage of questions that have at least one answer."""
#     try:
#         # Get total number of questions
#         total_questions = questions_collection.count_documents({})

#         # Get count of questions that have at least one answer
#         answered_questions = answers_collection.distinct("question")  # Get unique question IDs
#         answered_count = len(answered_questions)

#         # Calculate answer rate
#         answer_rate = (answered_count / total_questions * 100) if total_questions > 0 else 0

#         return jsonify({
#             "answer_rate": f"{answer_rate:.1f}%",
#             "total_questions": total_questions,
#             "answered_questions": answered_count,
#             "subtext": "Percentage of questions with at least one answer",
#             "icon": "up" if answer_rate > 50 else "down"  # Custom logic for up/down icon
#         }), 200

#     except Exception as e:
#         return jsonify({"error": f"An error occurred: {str(e)}"}), 500
@bp.route("/answer_growth", methods=["GET"])
def get_answer_growth():
    """Fetch the percentage of total questions that have been answered across all months."""
    try:
        # Get total number of questions
        total_questions = questions_collection.count_documents({})

        # Get count of questions that have at least one answer
        answered_questions = len(answers_collection.distinct("question"))

        # Calculate the overall answer growth percentage
        answer_growth = (answered_questions / total_questions * 100) if total_questions > 0 else 0

        # Set short text description
        if answer_growth < 50:
            growth_text = f"Only {answer_growth:.1f}% of questions are answered, needs improvement!"
            icon = "down"
        elif 50 <= answer_growth < 75:
            growth_text = f"{answer_growth:.1f}% of questions are answered, decent engagement!"
            icon = "up"
        else:
            growth_text = f"{answer_growth:.1f}% of questions are answered, great community response!"
            icon = "up"

        return jsonify({
            "answer_growth": f"{answer_growth:.1f}%",
            "growth_text": growth_text,  # ✅ Simplified short text
            "icon": icon
        }), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
