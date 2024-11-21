import React, { useState, useEffect } from "react";

export default function PhysicalData() {
  const [checked, setChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    userName: "JohnDoe",
    weight: 150,
    height: 68,
    age: 30,
    gender: "M",
    activityLevel: "1",
  });

  const calculateCalories = (user) => {
    let bmr, multiplier;
    const { gender, weight, height, age, activityLevel } = user;

    if (gender === "M") {
      bmr = 66.47 + 6.24 * weight + 12.7 * height - 6.76 * age;
    } else {
      bmr = 655.1 + 4.35 * weight + 4.7 * height - 4.7 * age;
    }

    switch (activityLevel) {
      case "0":
        multiplier = 1.2;
        break;
      case "1":
        multiplier = 1.375;
        break;
      case "2":
        multiplier = 1.55;
        break;
      case "3":
        multiplier = 1.725;
        break;
      case "4":
        multiplier = 1.9;
        break;
      default:
        multiplier = 1.2;
    }

    return Math.round(bmr * multiplier);
  };

  const changeChecked = () => setChecked(!checked);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Data submitted:", currentUser);
    changeChecked();
  };

  const pageStyle = {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    color: "#333",
  };

  const labelStyle = {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  };

  const inputStyle = {
    marginBottom: "15px",
    padding: "10px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "white",
    backgroundColor: "slateblue",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "darkslateblue",
  };

  const sectionStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };

  return (
    <div style={pageStyle}>
      {checked ? (
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "center", color: "slateblue" }}>
            Update your physical metrics, {currentUser.userName}
          </h1>

          <div>
            <label htmlFor="age" style={labelStyle}>
              Age (years)
            </label>
            <input
              id="age"
              name="age"
              value={currentUser.age}
              type="number"
              style={inputStyle}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="M"
                checked={currentUser.gender === "M"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="F"
                checked={currentUser.gender === "F"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>

          <div>
            <label style={labelStyle}>Activity Level:</label>
            <label>
              <input
                type="radio"
                name="activityLevel"
                value="0"
                checked={currentUser.activityLevel === "0"}
                onChange={handleChange}
              />
              0 - Sedentary
            </label>
            <label>
              <input
                type="radio"
                name="activityLevel"
                value="1"
                checked={currentUser.activityLevel === "1"}
                onChange={handleChange}
              />
              1 - Light Activity
            </label>
            <label>
              <input
                type="radio"
                name="activityLevel"
                value="2"
                checked={currentUser.activityLevel === "2"}
                onChange={handleChange}
              />
              2 - Moderate Activity
            </label>
            <label>
              <input
                type="radio"
                name="activityLevel"
                value="3"
                checked={currentUser.activityLevel === "3"}
                onChange={handleChange}
              />
              3 - Active
            </label>
            <label>
              <input
                type="radio"
                name="activityLevel"
                value="4"
                checked={currentUser.activityLevel === "4"}
                onChange={handleChange}
              />
              4 - Very Active
            </label>
          </div>

          <div>
            <label htmlFor="weight" style={labelStyle}>
              Weight (lb)
            </label>
            <input
              id="weight"
              name="weight"
              value={currentUser.weight}
              type="number"
              style={inputStyle}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="height" style={labelStyle}>
              Height (in)
            </label>
            <input
              id="height"
              name="height"
              value={currentUser.height}
              type="number"
              style={inputStyle}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "darkslateblue")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "slateblue")}
          >
            Submit
          </button>
          <div>
            <label htmlFor="update" style={labelStyle}>
              Cancel update:
            </label>
            <input
              id="update"
              type="checkbox"
              checked={checked}
              onChange={changeChecked}
            />
          </div>
        </form>
      ) : (
        <section style={sectionStyle}>
          <h1>Your Physical Metrics, {currentUser.userName}</h1>
          <p>Weight (lb): {currentUser.weight}</p>
          <p>Height (in): {currentUser.height}</p>
          <p>Caloric Intake: {calculateCalories(currentUser)}</p>
          <label htmlFor="update" style={labelStyle}>
            Update info:
          </label>
          <input
            id="update"
            type="checkbox"
            checked={checked}
            onChange={changeChecked}
          />
        </section>
      )}
    </div>
  );
}
