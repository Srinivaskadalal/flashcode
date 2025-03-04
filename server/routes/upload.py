from flask import Blueprint, request, jsonify
from database import fs
from bson import ObjectId

bp = Blueprint("upload", __name__, url_prefix="/api/upload")

@bp.route("/image", methods=["POST"])
def upload_image():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_id = fs.put(file, filename=file.filename)
    return jsonify({"message": "Image uploaded!", "file_id": str(file_id)}), 201
