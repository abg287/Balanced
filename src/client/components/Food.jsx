// Imports

// Will return a "container" for the header of the website
export default function Food( props ) {


    // The handleDelete function calls a function to delete an expense
    const handleClick = () => {
      props.deleteFood( props.index );
    }



    return (

            <div id ="FoodItem">
              <p id ="FoodName">{ props.name }</p>
              <p id ="FoodCalories">{ props.calories } Calories</p>
              <p className="FoodNutrients">Total Fat: { props.totalFat } grams</p>
              <p className="FoodNutrients">Total Carbs: { props.totalCarbs } grams</p>
              <p className="FoodNutrients">Protein: { props.protein } grams</p>
              <p className="FoodNutrients">Sugars: { props.sugars } grams</p>

              <button onClick = { handleClick }>Delete</button>
            </div>

    )
}
