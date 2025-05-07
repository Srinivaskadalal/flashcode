# import os
# from dotenv import load_dotenv

# load_dotenv()

# class Config:
#     MONGO_URI = os.getenv("MONGO_URI")
#     DATABASE_NAME = os.getenv("DATABASE_NAME")
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI")  # Load MongoDB URL from environment
    DATABASE_NAME = os.getenv("DATABASE_NAME")  # Load database name

config = Config()
