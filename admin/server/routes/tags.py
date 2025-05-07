
from flask import Blueprint, jsonify
from models.database import tags_collection

# ✅ Blueprint setup with consistent prefix
# This makes all routes start with /api/tags
# So @route("/distribution") means /api/tags/distribution

tags_bp = Blueprint("tags", __name__, url_prefix="/api/tags")

# -----------------------------------------------------------
# 📌 GET /api/tags
# 🔹 Get all tags sorted by createdAt DESC
# -----------------------------------------------------------
@tags_bp.route("/", methods=["GET"])
def get_all_tags():
    try:
        tags = tags_collection.find().sort("createdAt", -1)
        result = [
            {
                "id": str(tag["_id"]),
                "name": tag["name"],
                "questions": tag.get("questions", 0),
                "createdAt": tag.get("createdAt"),
                "updatedAt": tag.get("updatedAt"),
            }
            for tag in tags
        ]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": f"Failed to fetch tags: {str(e)}"}), 500

# -----------------------------------------------------------
# 📊 GET /api/tags/distribution
# 🔹 For pie chart: Top languages + Others
# -----------------------------------------------------------
@tags_bp.route("/distribution", methods=["GET"])
def get_tag_distribution():
    try:
        pipeline = [
            {
                "$group": {
                    "_id": "$name",
                    "count": {"$sum": "$questions"},
                    "firstCreatedAt": {"$min": "$createdAt"},
                }
            },
            {"$sort": {"count": -1, "firstCreatedAt": 1}},
            {"$limit": 5}
        ]

        top_tags = list(tags_collection.aggregate(pipeline))
        total_count = sum(tag["count"] for tag in top_tags)

        chart_data = [
            {
                "tag": tag["_id"],
                "count": tag["count"],
                "percentage": round((tag["count"] / total_count) * 100, 2),
            }
            for tag in top_tags
        ]

        return jsonify(chart_data), 200

    except Exception as e:
        return jsonify({"error": f"Failed to fetch tag distribution: {str(e)}"}), 500



# -----------------------------------------------------------
# 🧮 GET /api/tags/unique_total
# 🔹 Get total number of unique tag names
# -----------------------------------------------------------
@tags_bp.route("/unique_total", methods=["GET"])
def get_total_unique_tags():
    try:
        unique_tags = tags_collection.distinct("name")
        return jsonify({"total_unique_tags": len(unique_tags)}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to fetch unique tags: {str(e)}"}), 500

# -----------------------------------------------------------
# 🏆 GET /api/tags/top
# 🔹 Get top 5 tags by total questions
# -----------------------------------------------------------
@tags_bp.route("/top", methods=["GET"])
def get_top_tags():
    try:
        pipeline = [
            {
                "$group": {
                    "_id": "$name",
                    "count": {"$sum": "$questions"},
                    "firstCreatedAt": {"$min": "$createdAt"},
                }
            },
            {"$sort": {"count": -1, "firstCreatedAt": 1}},
            {"$limit": 5},
        ]
        top_tags = list(tags_collection.aggregate(pipeline))

        total_count = sum(tag["count"] for tag in top_tags)

        response = [
            {
                "tag": tag["_id"],
                "count": tag["count"],
                "percentage": round((tag["count"] / total_count) * 100, 2),  # ✅ This is what PieChart needs
                "createdAt": tag["firstCreatedAt"],
            }
            for tag in top_tags
        ]

        return jsonify({"top_tags": response}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to fetch top tags: {str(e)}"}), 500



#