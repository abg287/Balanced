import requests

API_KEY = 'yz+zfBqxs9Ah1I+j2H6C9w==xbibi9eg7y7QlKGX'  # Replace with your actual API key
API_URL = 'https://api.calorieninjas.com/v1/nutrition?query='

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

# Allow user input
user_input = input("Enter the meal you are eating (e.g., '3lb carrots and a chicken sandwich'): ")

# Fetch and display results
result = search_food(user_input)

if result:
    print("Nutrition information:")
    for item in result.get('items', []):
        print(f"Food: {item.get('name', 'Unknown')}")
        print(f"Calories: {item.get('calories', 'N/A')}")
        print(f"Carbs: {item.get('carbohydrates_total_g', 'N/A')} g")
        print(f"Protein: {item.get('protein_g', 'N/A')} g")
        print(f"Fat: {item.get('fat_total_g', 'N/A')} g")
        print("-" * 30)
else:
    print("Failed to retrieve nutrition information.")