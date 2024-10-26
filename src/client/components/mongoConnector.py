from pymongo import MongoClient

# Replace with your MongoDB connection string
MONGO_URI = "mongodb+srv://admin:pass@atlascluster.wzdy0ju.mongodb.net/BalancedDB"

client = MongoClient(MONGO_URI)
db = client['food_database']  # Create/select a database
collection = db['food_items']  # Create/select a collection

print("Connected to MongoDB successfully!")
