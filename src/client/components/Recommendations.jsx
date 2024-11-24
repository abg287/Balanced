// Imports
// Imports
import { useState, useEffect } from "react";
import useFetch from '../hooks/useFetch.js';
import Food from "./Food.jsx";

// Will return a "container" for the header of the website
export default function Recommendations() {
  // Find the nutrients missing the most and return the string
  const findMissingNutrients = () => {

    var ranNum = Math.ceil(Math.random() * 10 % 4);
    var result;

    switch (ranNum) {
      case 1:
        result = "totalFat";
        break;
      case 2:
        result = "totalCarbs";
        break;
      case 3:
        result = "protein";
        break;
      default:
        result = "sugars";
    }
    return result;
  }

  // Given the table of all the foods and a nutrient value
  //     Return a table of 3 foods that all have the highest value for the given nutrients
  const getReccommendations = (foodTable, nutrientString) => {
    var nutrientValue
    const resultTable = [0, 0, 0]
    // Loop through each food in the table
    for (let key in foodTable) {
      // Get the nutrient value
      nutrientValue = foodTable[key][nutrientString]
      // If nutrient is higher than the first
      if (resultTable[0] == 0 || resultTable[0][nutrientString] < nutrientValue) {
        // Move results down
        resultTable[2] = resultTable[1]
        resultTable[1] = resultTable[0]
        // Overwrite
        resultTable[0] = foodTable[key]
      }
      // Or Higher than the second
      else if (resultTable[1] == 0 || resultTable[1][nutrientString] < nutrientValue) {
        // Move result down
        resultTable[2] = resultTable[1]
        // Overwrite
        resultTable[1] = foodTable[key]
      }
      // Or higher than the third
      else if (resultTable[2] == 0 || resultTable[2][nutrientString] < nutrientValue) {
        // Overwrite
        resultTable[2] = foodTable[key]
      }
    }
    // Return
    return resultTable
  }

  // Helper for the function below
  const creationHelper = (foodItem) => {
    return (
      <>
      <div id="FoodRecommendation"> {/* TEMPORARY*/}
            <p id="FoodName">{foodItem["name"]}</p>
            <p id="FoodCalories">{foodItem["calories"]} Calories</p>
            <p className="FoodNutrients">Total Fat: {foodItem["totalFat"]} grams</p>
            <p className="FoodNutrients">Total Carbs: {foodItem["totalCarbs"]} grams</p>
            <p className="FoodNutrients">Protein: {foodItem["protein"]} grams</p>
            <p className="FoodNutrients">Sugars: {foodItem["sugars"]} grams</p>
          </div>
      </>
    )
  }

  // Given the food recommendations return a container with the HTML for the three items
  const createHTML = (reccTable) => {
    return (
      <>
        {creationHelper(reccTable[0])}
        {creationHelper(reccTable[1])}
        {creationHelper(reccTable[2])}
      </>
    )
  }

  // Get the missing nutrient
  const missingNutrient = findMissingNutrients()

  // Get the foods data from server
  const data = useFetch("/api/home");
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    if (data) {
      setFoods([...data]);
    }
  }, [data]);

  console.log(foods);

  // Get the recommendations
  const recommendations = getReccommendations(foods, missingNutrient)

  console.log(recommendations);

  // Container to return 
  return (
    <>
      <div id="RecommendDiv">
        <h1>Recommendations</h1>
        <p>Based on your past diet, we recommend...</p>
        <p id="TextRecommend">Try to consume more {missingNutrient}</p>
        <div id="RecommendBox">
          {createHTML(recommendations)}
        </div>
      </div>
    </>
  )
}