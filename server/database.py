from pymongo import MongoClient
import os
from dotenv import load_dotenv
import gridfs

# Load environment variables
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "event_blog_db")

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

# ✅ Collections (Both Events & Blogs are supported)
events_collection = db["events"]
blogs_collection = db["blogs"]

# ✅ GridFS for image uploads
fs = gridfs.GridFS(db)
