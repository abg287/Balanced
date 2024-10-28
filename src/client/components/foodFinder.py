import requests

API_KEY = 'u1AT3AVGg51R8TweNHSRbfdJbTv5naw9TCofrA7l'  # Replace with your actual API key

def search_food(query):
    url = f"https://api.nal.usda.gov/fdc/v1/foods/search?api_key={API_KEY}"
    payload = {
        "query": query,
        "pageSize": 5,
        "dataType": ["Foundation", "Branded"]
    }
    response = requests.post(url, json=payload)

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch data: {response.status_code}")
        return None

# Example usage
result = search_food("Cheddar cheese")
print(result)