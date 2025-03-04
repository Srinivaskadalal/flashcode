import jwt
import os
from flask import request, jsonify
from functools import wraps
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("NEXTAUTH_SECRET", "your-secret-key")  # Must match NextAuth

# ✅ Middleware to protect routes
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]  # Extract token

        if not token:
            return jsonify({"error": "Authentication token is missing!"}), 401

        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user = decoded_token  # Attach user info to request
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token!"}), 401

        return f(*args, **kwargs)

    return decorated
