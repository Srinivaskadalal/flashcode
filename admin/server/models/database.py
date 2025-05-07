
from pymongo import MongoClient
from config import Config

# ✅ Connect to MongoDB
client = MongoClient(Config.MONGO_URI)
db = client[Config.DATABASE_NAME]

# ✅ Ensure all collections exist
events_collection = db["events"]
users_collection = db["users"]  
questions_collection = db["questions"] 
answers_collection = db["answers"]
tags_collection = db["tags"]
important_dates_collection = db["important_dates"]  # ✅ Added
magazines_collection = db["magazines"]

#  Print collections
print("Collections available:", db.list_collection_names())

# Create Indexes (If needed)
questions_collection.create_index("created_at")
answers_collection.create_index("created_at")
