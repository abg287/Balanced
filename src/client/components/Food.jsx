// Imports
import { useState } from "react";

// Will return a "container" for the header of the website
export default function Food(props) {
    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState(false);

    // Fetch reviews for the current food
    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8080/food/${props.name}`);
            if (response.ok) {
                const data = await response.json();
                setReviews(data.reviews || []); // If no reviews, set an empty array
                setShowReviews(!showReviews); // Toggle the visibility of the reviews
            } else {
                console.error("Failed to fetch reviews.");
            }
        } catch (error) {
            console.error("Error fetching reviews: ", error);
        }
    };

    // The handleDelete function calls a function to delete a food
    const handleClick = () => {
        props.deleteFood(props.index);
    };

    return (
        <div id="FoodItem">
            <p id="FoodName">{props.name}</p>
            <p id="FoodCalories">{props.calories} Calories</p>
            <p className="FoodNutrients">Total Fat: {props.totalFat} grams</p>
            <p className="FoodNutrients">Total Carbs: {props.totalCarbs} grams</p>
            <p className="FoodNutrients">Protein: {props.protein} grams</p>
            <p className="FoodNutrients">Sugars: {props.sugars} grams</p>

            <button onClick={handleClick}>Delete</button>
            <button onClick={fetchReviews}>
                {showReviews ? "Hide Reviews" : "View Reviews"}
            </button>

            {showReviews && (
                <div className="ReviewsContainer">
                    <h4>Reviews:</h4>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review, index) => (
                                <li key={index}>
                                    <strong>{review.userName}:</strong> {review.comment}{" "}
                                    (Rating: {review.rating}/5)
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </div>
            )}
        </div>
    );
}
