def store_food_data(query):
    data = search_food(query)
    if data and "foods" in data:
        # Insert the food data into MongoDB
        result = collection.insert_many(data["foods"])
        print(f"Inserted {len(result.inserted_ids)} food items into MongoDB.")
    else:
        print("No food data found or failed to fetch data.")

# Example usage
store_food_data("Cheddar cheese")