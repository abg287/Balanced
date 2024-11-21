import { useState } from "react";

export default function Food(props) {
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8080/food/${props.name}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []); // Default to an empty array if no reviews
        setShowReviews(!showReviews); // Toggle review visibility
      } else {
        console.error("Failed to fetch reviews.");
      }
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  };

  const handleClick = () => {
    props.deleteFood(props.index);
  };

  const containerStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  };

  const nutrientStyle = {
    margin: "5px 0",
    fontSize: "0.9rem",
    color: "#555",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  };

  const buttonStyle = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#e74c3c",
    color: "#fff",
  };

  const viewButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3498db",
    color: "#fff",
  };

  const reviewContainerStyle = {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };

  const reviewTitleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  return (
    <div style={containerStyle}>
      {/* Food Header */}
      <p style={headerStyle}>{props.name}</p>

      {/* Food Nutritional Info */}
      <p style={nutrientStyle}>{props.calories} Calories</p>
      <p style={nutrientStyle}>Total Fat: {props.totalFat} grams</p>
      <p style={nutrientStyle}>Total Carbs: {props.totalCarbs} grams</p>
      <p style={nutrientStyle}>Protein: {props.protein} grams</p>
      <p style={nutrientStyle}>Sugars: {props.sugars} grams</p>

      {/* Buttons */}
      <div style={buttonContainerStyle}>
        <button style={deleteButtonStyle} onClick={handleClick}>
          Delete
        </button>
        <button style={viewButtonStyle} onClick={fetchReviews}>
          {showReviews ? "Hide Reviews" : "View Reviews"}
        </button>
      </div>

      {/* Reviews Section */}
      {showReviews && (
        <div style={reviewContainerStyle}>
          <h4 style={reviewTitleStyle}>Reviews:</h4>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  <strong>{review.userName}:</strong> {review.comment}{" "}
                  <span style={{ color: "#f39c12" }}>
                    (Rating: {review.rating}/5)
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#888" }}>No reviews available.</p>
          )}
        </div>
      )}
    </div>
  );
}
