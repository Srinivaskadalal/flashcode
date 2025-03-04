from flask import Blueprint, request, jsonify
from pymongo import DESCENDING
from database import blogs_collection
from bson import ObjectId
from datetime import datetime
from auth import token_required  # Import authentication middleware

bp = Blueprint("blogs", __name__, url_prefix="/api/blogs")

# ✅ Create a new blog (Only logged-in users)
@bp.route("/", methods=["POST"])
@token_required  # Require authentication
def create_blog():
    data = request.json

    if not data.get("title") or not data.get("content"):
        return jsonify({"error": "Title and content are required"}), 400

    author_email = request.user["email"]

    blog = {
        "title": data["title"],
        "content": data["content"],
        "author": author_email,
        "tags": data.get("tags", []),
        "created_at": datetime.utcnow(),
        "image_url": data.get("image_url", None),
    }

    inserted_id = blogs_collection.insert_one(blog).inserted_id
    return jsonify({"message": "Blog created!", "blog_id": str(inserted_id)}), 201


# ✅ Get all blogs
@bp.route("/", methods=["GET"])
def get_blogs():
    blogs = list(
        blogs_collection.find({}, {"_id": 1, "title": 1, "author": 1, "tags": 1, "created_at": 1})
        .sort("created_at", DESCENDING)
    )

    for blog in blogs:
        blog["_id"] = str(blog["_id"])  # Convert ObjectId to string

    return jsonify(blogs), 200


# ✅ Update a blog (Only the author can edit)
@bp.route("/<blog_id>", methods=["PUT"])
@token_required
def update_blog(blog_id):
    data = request.json
    blog = blogs_collection.find_one({"_id": ObjectId(blog_id)})

    if not blog:
        return jsonify({"error": "Blog not found"}), 404

    if blog["author"] != request.user["email"]:
        return jsonify({"error": "You are not the author of this blog!"}), 403

    blogs_collection.update_one({"_id": ObjectId(blog_id)}, {"$set": data})
    return jsonify({"message": "Blog updated!"}), 200


# ✅ Delete a blog (Only the author can delete)
@bp.route("/<blog_id>", methods=["DELETE"])
@token_required
def delete_blog(blog_id):
    blog = blogs_collection.find_one({"_id": ObjectId(blog_id)})

    if not blog:
        return jsonify({"error": "Blog not found"}), 404

    if blog["author"] != request.user["email"]:
        return jsonify({"error": "You are not the author of this blog!"}), 403

    blogs_collection.delete_one({"_id": ObjectId(blog_id)})
    return jsonify({"message": "Blog deleted!"}), 200
