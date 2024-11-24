import requests

# API Configuration
API_KEY = 'yz+zfBqxs9Ah1I+j2H6C9w==xbibi9eg7y7QlKGX'  # Replace with your actual API key
API_URL = 'https://api.calorieninjas.com/v1/nutrition?query='

# In-Memory Data Storage
nutrition_data = []

def save_to_data_structure(query, results):
    """
    Save the query and its nutrition results to the in-memory data structure.

    Args:
        query (str): The user's query.
        results (list): List of food item data dictionaries.
    """
    for item in results:
        nutrition_data.append({
            "query": query,
            "food_name": item.get('name', 'Unknown'),
            "calories": item.get('calories', None),
            "carbohydrates": item.get('carbohydrates_total_g', None),
            "protein": item.get('protein_g', None),
            "fat": item.get('fat_total_g', None),
            "sugars": item.get('sugar_g', None)
        })

def display_recent_data():
    """
    Display the most recent 10 entries in the in-memory data structure.
    """
    if nutrition_data:
        print("\nRecent Entries:")
        for entry in nutrition_data[-10:]:
            print(f"Query: {entry['query']}")
            print(f"  Food: {entry['food_name']}")
            print(f"  Calories: {entry['calories']}")
            print(f"  Carbs: {entry['carbohydrates']} g")
            print(f"  Protein: {entry['protein']} g")
            print(f"  Fat: {entry['fat']} g")
            print(f"  Sugars: {entry['sugars']} g")
            print("-" * 30)
    else:
        print("No recent entries found.")

def search_food(query):
    """
    Fetch nutrition information for the given food query.
    
    Args:
        query (str): The food query string (e.g., "3lb carrots and a chicken sandwich").
    
    Returns:
        dict: Parsed JSON response with nutrition information if successful.
        None: If the request fails.
    """
    response = requests.get(API_URL + query, headers={'X-Api-Key': API_KEY})
    
    if response.status_code == requests.codes.ok:
        return response.json()
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

# Main loop
while True:
    # Allow user input
    user_input = input("Enter the meal you are eating (e.g., '3lb carrots and a chicken sandwich') or type 'exit' to quit: ")
    if user_input.lower() == 'exit':
        print("Goodbye!")
        break

    # Fetch and display results
    result = search_food(user_input)

    if result:
        print("\nNutrition information:")
        items = result.get('items', [])
        for item in items:
            print(f"Food: {item.get('name', 'Unknown')}")
            print(f"Calories: {item.get('calories', 'N/A')}")
            print(f"Carbs: {item.get('carbohydrates_total_g', 'N/A')} g")
            print(f"Protein: {item.get('protein_g', 'N/A')} g")
            print(f"Fat: {item.get('fat_total_g', 'N/A')} g")
            print(f"Sugars: {item.get('sugar_g', 'N/A')} g")
            print("-" * 30)

        # Save query and results to the in-memory data structure
        save_to_data_structure(user_input, items)
    else:
        print("Failed to retrieve nutrition information.")

    # Display recent entries from the in-memory data structure
    display_recent_data()
