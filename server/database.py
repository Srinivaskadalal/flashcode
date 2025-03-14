from pymongo import MongoClient
import os
from dotenv import load_dotenv
import gridfs


load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "event_blog_db")

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]


events_collection = db["events"]
blogs_collection = db["blogs"]


fs = gridfs.GridFS(db)
