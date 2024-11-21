import React, { useState } from "react";

export default function AddFood() {
  const [isExpanded, setExpanded] = useState(false);

  const [food, setFood] = useState({
    name: "",
    calories: "",
    totalFat: "",
    saturatedFat: "",
    polyunsaturatedFat: "",
    monounsaturatedFat: "",
    transFat: "",
    cholesterol: "",
    sodium: "",
    potassium: "",
    totalCarbs: "",
    dietaryFiber: "",
    sugars: "",
    protein: "",
    vitaminA: "",
    vitaminC: "",
    calcium: "",
    iron: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFood((prevFood) => ({ ...prevFood, [name]: value }));
  };

  const changeExpand = () => {
    setExpanded(!isExpanded);
  };

  const isPositive = (number) => Number(number) >= 0;

  const foodFactsValid = (food) => {
    if (!food.name.trim()) return false; // Name must not be empty
    if (!isPositive(food.calories)) return false; // Calories must be positive
    return true;
  };

  const submitFood = (event) => {
    event.preventDefault();
    if (foodFactsValid(food)) {
      fetch("http://localhost:8080/add-food", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(food),
      })
        .then((res) => res.json())
        .then((data) =>
          setFood((prevFood) => ({
            ...prevFood,
            ...data,
          }))
        );
      // Reset form
      setFood({
        name: "",
        calories: "",
        totalFat: "",
        saturatedFat: "",
        polyunsaturatedFat: "",
        monounsaturatedFat: "",
        transFat: "",
        cholesterol: "",
        sodium: "",
        potassium: "",
        totalCarbs: "",
        dietaryFiber: "",
        sugars: "",
        protein: "",
        vitaminA: "",
        vitaminC: "",
        calcium: "",
        iron: "",
      });
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };

  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    fontSize: "0.9rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "0.9rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "slateblue",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "15px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", color: "slateblue" }}>Add Food</h1>
      <form onSubmit={submitFood}>
        {/* Name */}
        <label htmlFor="name" style={labelStyle}>
          Name
        </label>
        <input
          id="name"
          name="name"
          value={food.name}
          type="text"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Calories */}
        <label htmlFor="calories" style={labelStyle}>
          Calories
        </label>
        <input
          id="calories"
          name="calories"
          value={food.calories}
          type="number"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Expand Additional Fields */}
        <label htmlFor="expand" style={labelStyle}>
          Add More Details
        </label>
        <input
          id="expand"
          name="expand"
          type="checkbox"
          onChange={changeExpand}
          style={{ marginBottom: "15px" }}
        />

        {isExpanded && (
          <>
            {/* Total Fat */}
            <label htmlFor="total-fat" style={labelStyle}>
              Total Fat (g)
            </label>
            <input
              id="total-fat"
              name="totalFat"
              value={food.totalFat}
              type="number"
              onChange={handleChange}
              style={inputStyle}
            />

            {/* Sugars */}
            <label htmlFor="sugars" style={labelStyle}>
              Sugars (g)
            </label>
            <input
              id="sugars"
              name="sugars"
              value={food.sugars}
              type="number"
              onChange={handleChange}
              style={inputStyle}
            />

            {/* Protein */}
            <label htmlFor="protein" style={labelStyle}>
              Protein (g)
            </label>
            <input
              id="protein"
              name="protein"
              value={food.protein}
              type="number"
              onChange={handleChange}
              style={inputStyle}
            />
          </>
        )}

        {/* Submit Button */}
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
}
