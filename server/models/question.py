from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI", "")

# Initialize MongoDB Client
client = MongoClient(MONGO_URI)
db = client["flashcode_admin"]  # Database Name
question_collection = db["questions"]  # Collection Name

# Question Model (Equivalent)
def create_question(title, content, author_id, tags):
    question = {
        "title": title,
        "content": content,
        "tags": [ObjectId(tag) for tag in tags],  # Convert tags to ObjectIds
        "views": 0,
        "answers": 0,
        "upvotes": 0,
        "downvotes": 0,
        "author": ObjectId(author_id),  # Convert author to ObjectId
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    result = question_collection.insert_one(question)
    return str(result.inserted_id)
