// Imports
import { useState} from "react";
import Review from "./Review";

// Will return a "container" for the header of the website
export default function Food( props ) {
  // The handleDelete function calls a function to delete an expense
  const handleClick = () => {
    props.deleteFood( props.index );
  }

  const [isChecked, setIsChecked] = useState( false );

  const changeChecked = () => {
    setIsChecked( !isChecked );
  }

  return (
          <div id ="FoodItem">
            <p id ="FoodName">{ props.name }</p>
            <p id ="FoodCalories">{ props.calories } Calories</p>
            <p className="FoodNutrients">Total Fat: { props.totalFat } grams</p>
            <p className="FoodNutrients">Total Carbs: { props.totalCarbs } grams</p>
            <p className="FoodNutrients">Protein: { props.protein } grams</p>
            <p className="FoodNutrients">Sugars: { props.sugars } grams</p>

            { props.review.rating === null ? <></> :
              <>
                <label htmlFor = "update">Press to see review:</label>
                <input
                  id = "update"
                  type="checkbox"
                  defaultChecked = { isChecked }
                  onClick={ changeChecked }        
                />
                { !isChecked ? <></> :
                  <Review
                    rating = {props.review.rating}
                    comment = {props.review.comment}
                  />
                }
              </>
            }
            <button onClick = { handleClick }>Delete</button>
          </div>
  )
}