import requests
from collections import deque

API_KEY = 'yz+zfBqxs9Ah1I+j2H6C9w==xbibi9eg7y7QlKGX'  # Replace with your actual API key
API_URL = 'https://api.calorieninjas.com/v1/nutrition?query='
MAX_RECENT_QUERIES = 10

# In-memory storage for recent queries
recent_queries = deque(maxlen=MAX_RECENT_QUERIES)

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

def save_query(query):
    """
    Save the user's query in memory.

    Args: 
        query (str): The user's query to save.
    """
    recent_queries.append(query)

def display_recent_queries():
    """
    Display the last 10 user queries stored in memory.
    """
    if recent_queries:
        print("\nRecent Queries:")
        for i, q in enumerate(recent_queries, 1):
            print(f"{i}. {q}")
    else:
        print("\nNo recent queries found.")

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
        for item in result.get('items', []):
            print(f"Food: {item.get('name', 'Unknown')}")
            print(f"Calories: {item.get('calories', 'N/A')}")
            print(f"Carbs: {item.get('carbohydrates_total_g', 'N/A')} g")
            print(f"Protein: {item.get('protein_g', 'N/A')} g")
            print(f"Fat: {item.get('fat_total_g', 'N/A')} g")
            print("-" * 30)
        save_query(user_input)
    else:
        print("Failed to retrieve nutrition information.")

    # Display recent queries
    display_recent_queries()
