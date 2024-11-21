import requests

API_KEY = 'yz+zfBqxs9Ah1I+j2H6C9w==xbibi9eg7y7QlKGX'  # Replace with your actual API key
API_URL = 'https://api.calorieninjas.com/v1/recipe?query='

def search_recipe(query):
    """
    Fetch a recipe based on the food query.
    
    Args:
        query (str): The food query string (e.g., "toast").
    
    Returns:
        dict: Parsed JSON response with recipe details if successful.
        None: If the request fails.
    """
    response = requests.get(API_URL + query, headers={'X-Api-Key': API_KEY})
    
    if response.status_code == requests.codes.ok:
        return response.json()
    else:
        print(f"Error fetching recipe for {query}: {response.status_code}")
        return None

def pre_plan_meals():
    # Define the meal plan (simple food items for breakfast, lunch, and dinner)
    meals = {
        "Monday": ["toast", "wrap", "pasta"],
        "Tuesday": ["smoothie", "chicken", "risotto"],
        "Wednesday": ["toast", "wrap", "risotto"],
        "Thursday": ["eggs", "wrap", "pasta"],
        "Friday": ["oatmeal", "soup", "risotto"],
        "Saturday": ["eggs", "wrap", "risotto"],
        "Sunday": ["eggs", "salad", "pasta"]
    }

    for day, foods in meals.items():
        print(f"--- {day} ---")
        for meal_time, food in zip(["Breakfast", "Lunch", "Dinner"], foods):
            result = search_recipe(food)
            if result:
                print(f"{meal_time}: {result[0]['title']}")
                print(f"Ingredients: {result[0]['ingredients']}")
                print(f"Instructions: {result[0]['instructions']}")
            else:
                print(f"{meal_time}: No recipe found for {food}")
            print("-" * 40)

# Run the pre-planning function
pre_plan_meals()
