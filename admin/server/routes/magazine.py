from flask import Blueprint, request, jsonify
from models.database import magazines_collection
from bson import ObjectId
import cloudinary.uploader
from cloudinary_config import cloudinary

magazine_bp = Blueprint("magazines", __name__, url_prefix="/api/magazines")

# Upload Magazine
@magazine_bp.route("/add", methods=["POST"])
def add_magazine():
    try:
        name = request.form.get("name")
        description = request.form.get("description")
        link = request.form.get("link")
        image_file = request.files.get("image")

        if not all([name, description, link, image_file]):
            return jsonify({"error": "All fields are required"}), 400

        upload_result = cloudinary.uploader.upload(image_file)
        image_url = upload_result.get("secure_url")
        public_id = upload_result.get("public_id")

        magazine = {
            "name": name,
            "description": description,
            "link": link,
            "image_url": image_url,
            "cloudinary_id": public_id,
        }

        result = magazines_collection.insert_one(magazine)
        return jsonify({"message": "Magazine uploaded successfully", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get All Magazines
@magazine_bp.route("/all", methods=["GET"])
def get_all_magazines():
    try:
        magazines = list(magazines_collection.find())
        for m in magazines:
            m["id"] = str(m["_id"])
            m["imageUrl"] = m.pop("image_url", "")  # ✅ Fix key
            del m["_id"]
        return jsonify({"magazines": magazines}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Delete Magazine
@magazine_bp.route("/delete/<id>", methods=["DELETE"])
def delete_magazine(id):
    try:
        magazine = magazines_collection.find_one({"_id": ObjectId(id)})
        if not magazine:
            return jsonify({"error": "Magazine not found"}), 404

        cloudinary.uploader.destroy(magazine["cloudinary_id"])
        magazines_collection.delete_one({"_id": ObjectId(id)})
        return jsonify({"message": "Magazine deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
