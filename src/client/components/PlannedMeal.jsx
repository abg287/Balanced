// Imports

// Will return a "container" for the header of the website
export default function PlannedMeal( props ) {
  
    return (
            <div id ="FoodItem">
              <p id ="FoodName">{ props.name }</p>
              <p id ="FoodCalories">{ props.calories } Calories</p>
            </div>
    )
}