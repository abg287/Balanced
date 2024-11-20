import requests
import random

# Base URL of the API for meal options
API_URL = "https://fdc.nal.usda.gov/food-search?type=Survey%20(FNDDS)&query="  # Replace with your actual API endpoint
API_KEY = "u1AT3AVGg51R8TweNHSRbfdJbTv5naw9TCofrA7l"  # Replace with your actual API key if needed

# Function to fetch meals from the API for a specific meal type
def fetch_meals(meal_type):
    try:
        # Make a GET request to fetch meals by type (e.g., breakfast, lunch, dinner)
        response = requests.get(f"{API_URL}/{meal_type}", headers={"Authorization": f"Bearer {API_KEY}"})
        response.raise_for_status()
        meals = response.json()
        
        # Assuming the API returns a list of meals
        return [meal['name'] for meal in meals]
    
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {meal_type} meals: {e}")
        return []

# Function to create a weekly meal plan using the fetched meals
def create_weekly_meal_plan():
    weekly_plan = {}
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    # Fetch meals for each type from the API
    breakfast_options = fetch_meals("breakfast")
    lunch_options = fetch_meals("lunch")
    dinner_options = fetch_meals("dinner")
    
    for day in days_of_week:
        # Select a random meal for each meal type
        breakfast = random.choice(breakfast_options) if breakfast_options else "N/A"
        lunch = random.choice(lunch_options) if lunch_options else "N/A"
        dinner = random.choice(dinner_options) if dinner_options else "N/A"
        
        weekly_plan[day] = {
            "Breakfast": breakfast,
            "Lunch": lunch,
            "Dinner": dinner
        }
    
    return weekly_plan

# Generate the meal plan
meal_plan = create_weekly_meal_plan()

# Print out the meal plan
print("Weekly Meal Plan:")
for day, meals in meal_plan.items():
    print(f"\n{day}:")
    for meal_type, meal in meals.items():
        print(f"  {meal_type}: {meal}")
