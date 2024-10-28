// Imports
import React, {useState, useEffect} from 'react';


// Will return a "container" for the header of the website
export default function AddFood() {
  const [ isExpanded, setExpanded ] = useState( false );

  const [ food, setFood ] = useState({
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
    iron: ""
  }); 

  // The handleChange function gets current input from form
  const handleChange = ( event ) => {
    // Get user input
    const { name, value } = event.target;
    // return user input
    setFood( prevFood => { return { ...prevFood, [ name ]: value } } );
  }

  // The expand function sets isExpanded to true
  const changeExpand = () => {
    setExpanded( !isExpanded );
  }

  const isEmpty = str => {
    return !str.replace( /\s/g, '' ).length;
  }

  const isPositive = number => {
    return Number( number ) >= 0;
    
  }

  const inBetween = ( number, lowValue, highValue ) => {
    return lowValue <= Number( number ) && Number( number ) <= highValue;
  }

  const foodFactsValid = food => {
    let isValid = true;
    Object.keys( food ).forEach( ( fact ) => {

      if ( fact === "name" && isEmpty( food[ fact ] ) )
      {
        isValid = false;
      }

      else if ( fact != "name" && fact != "vitaminA" && fact != "vitaminC" && fact != "calcium" && fact != "iron" && !isPositive( food[ fact ] ) ) {
         isValid = false;
      }

      else if ( ( fact === "vitaminA" || fact === "vitaminC" || fact === "calcium" || fact === "iron" ) && !inBetween( food[ fact ], 0, 100 ) ) {
        isValid = false;
      }
    });
    return isValid;
  }

  // The submitExp submits the info from the form to the expense array
  const submitFood = ( event ) => {


    event.preventDefault();
    // If user filled in required fields
    if ( foodFactsValid( food ) ) {
      // const { totalFat, saturatedFat, polyunsaturatedFat, monounsaturatedFat, transFat, cholesterol, sodium, potassium, totalCarbs, dietaryFiber, sugars, protein, vitaminA, vitaminC, calcium, iron } = food;

      Object.keys( food ).forEach( ( fact ) => {
        if ( fact != "name" && fact != "calories" )
        {
          if ( food[ fact ] == "" ) {
            food[ fact ] = 0;
          }
        }
      });

      fetch( 'http://localhost:8080/add-food', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify( food )
      })
      .then( res => res.json() )
      .then( data => setFood( prevFood => { return { ...prevFood, data } } ) );

      setFood( prevFood => {
        return {
          ...prevFood,
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
          iron: ""
        }
      });
      
    }
    // Else
    else {
      // Alert user to enter required fields
      window.alert( "Please correctly enter required fields" );
    }
  }

  return (
    <div className="page add-meal">
      <h1>Add Food</h1>
      <form>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={food.name}
          type="text"
          onChange={ handleChange }
          required
        />

        <label htmlFor="calories">Calories</label>
        <input
          id="calories"
          name="calories"
          value={food.calories}
          type="number"
          onChange={ handleChange }
          required
        />


        <label htmlFor="expand">Expand additional fields</label>
        <input
          id="expand"
          name="expand"
          type="checkbox"
          onChange={changeExpand}
        />

        {isExpanded && ( <label htmlFor="total-fat">Total Fat (g)</label> ) }
        {isExpanded && (
        <input
          id="total-fat"
          name="totalFat"
          value={food.totalFat}
          type="number"
          onChange={ handleChange }
        />
        )}
{/* 
        {isExpanded && ( <label for="saturated-fat">Saturated Fat (g)</label> ) }
        {isExpanded && (
        <input
          id="saturated-fat"
          name="saturatedFat"
          value={food.saturatedFat}
          type="number"
          onChange={ handleChange }
        />
        )}
 
        {isExpanded && ( <label for="polyunsaturated-fat">Polyunsaturated Fat (g)</label> ) }
        {isExpanded && (
        <input
          id="polyunsaturated-fat"
          name="polyunsaturatedFat"
          value={food.polyunsaturatedFat}
          type="number"
          onChange={ handleChange }
        />
        )}

        {isExpanded && ( <label for="monounsaturated-fat">Monounsaturated Fat (g)</label> ) }
        {isExpanded && (
        <input
          id="monounsaturated-fat"
          name="monounsaturatedFat"
          value={food.monounsaturatedFat}
          type="number"
          onChange={ handleChange }
        />
        )}

        {isExpanded && ( <label for="trans-fat">Trans Fat (g)</label> ) }
        {isExpanded && (
        <input
          id="trans-fat"
          name="transFat"
          value={food.transFat}
          type="number"
          onChange={ handleChange }
        />
        )}

        {isExpanded && ( <label for="cholesterol">Cholesterol (mg)</label> ) }
        {isExpanded && (
        <input
          id="cholesterol"
          name="cholesterol"
          value={food.cholesterol}
          type="number"
          onChange={ handleChange }
        />
        )}

        {isExpanded && ( <label for="sodium">Sodium (mg)</label> ) }
        {isExpanded && (
        <input
          id="sodium"
          name="sodium"
          value={food.sodium}
          type="number"
          onChange={ handleChange }
        />
        )}

        {isExpanded && ( <label for="potassium">Potassium (mg)</label> ) }       
        {isExpanded && (
        <input
          id="potassium"
          name="potassium"
          value={food.potassium}
          type="number"
          onChange={ handleChange }
        />
        )}
*/}
        {isExpanded && ( <label htmlFor="total-carbs">Total Carbs (g)</label> ) }     
        {isExpanded && (
        <input
          id="total-carbs"
          name="totalCarbs"
          value={food.totalCarbs}
          type="number"
          onChange={ handleChange }
        />
        )}
{/*  
        {isExpanded && ( <label for="dietary-fiber">Dietary Fiber (g)</label> ) }
        {isExpanded && (
        <input
          id="dietary-fiber"
          name="dietaryFiber"
          value={food.dietaryFiber}
          type="number"
          onChange={ handleChange }
        />
        )}
*/}
        {isExpanded && ( <label htmlFor="sugars">Sugars (g)</label> ) }
        {isExpanded && (
        <input
          id="sugars"
          name="sugars"
          value={food.sugars}
          type="number"
          onChange={ handleChange }
        />
        )}

        {isExpanded && ( <label htmlFor="protein">Protein (g)</label> ) }
        {isExpanded && (
        <input
          id="protein"
          name="protein"
          value={food.protein}
          type="number"
          onChange={ handleChange }
        />
        )}
{/*  
        {isExpanded && ( <label for="vitamin-a">Vitamin A (%)</label> ) }
        {isExpanded && (
        <input
          id="vitamin-a"
          name="vitaminA"
          value={food.vitaminA}
          type="number"
          onChange={ handleChange }
        />
        )}

        {isExpanded && ( <label for="vitamin-c">Vitamin C (%)</label> ) }
        {isExpanded && (
        <input
          id="vitamin-c"
          name="vitaminC"
          value={food.vitaminC}
          type="number"
          onChange={ handleChange }
        />
        )}

        {isExpanded && ( <label for="calcium">Calcium (%)</label> ) }
        {isExpanded && (
        <input
          id="calcium"
          name="calcium"
          value={food.calcium}
          type="number"
          onChange={ handleChange }
        />
        )}

        {isExpanded && ( <label for="iron">Iron (%)</label> ) }
        {isExpanded && (
        <input
          id="iron"
          name="iron"
          value={food.iron}
          type="number"
          onChange={ handleChange }
        />
        )}
*/}

        <input
          type="submit"
          onClick={submitFood}
        />
      </form>
    </div>
  )
}
