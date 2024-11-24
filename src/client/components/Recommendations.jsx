// Imports
// Imports
import { useState, useEffect } from "react";
import useFetch from '../hooks/useFetch.js';
import Food from "./Food.jsx";

// Will return a "container" for the header of the website
export default function Recommendations() {
  return (
    <>
      <div id="RecommendDiv">
        <h1>Recommendations</h1>
        <p>Based on your past diet, we recommend...</p>
        <p id="TextRecommend">Try to consume more X</p>
        <div id="RecommendBox">
          <div id="FoodRecommendation"> {/* TEMPORARY*/}
            <p id="FoodName">Food Name</p>
            <p id ="FoodCalories">X Calories</p>
            <p className="FoodNutrients">Total Fat: X grams</p>
            <p className="FoodNutrients">Total Carbs: X grams</p>
            <p className="FoodNutrients">Protein: X grams</p>
            <p className="FoodNutrients">Sugars: X grams</p>
          </div>



          <div id="FoodRecommendation"> {/* TEMPORARY*/}
            <p id="FoodName">Food Name</p>
            <p id ="FoodCalories">X Calories</p>
            <p className="FoodNutrients">Total Fat: X grams</p>
            <p className="FoodNutrients">Total Carbs: X grams</p>
            <p className="FoodNutrients">Protein: X grams</p>
            <p className="FoodNutrients">Sugars: X grams</p>
          </div>
          <div id="FoodRecommendation"> {/* TEMPORARY*/}
            <p id="FoodName">Food Name</p>
            <p id ="FoodCalories">X Calories</p>
            <p className="FoodNutrients">Total Fat: X grams</p>
            <p className="FoodNutrients">Total Carbs: X grams</p>
            <p className="FoodNutrients">Protein: X grams</p>
            <p className="FoodNutrients">Sugars: X grams</p>
          </div>
        </div>
      </div>
    </>
  )
}