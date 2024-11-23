// Imports
import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.js";

// Will return a "container" for the header of the website
export default function PhysicalData() {

  const users = useFetch( "/api/physical-data" );
  const [ checked, setChecked ] = useState( false );
  const [ currentUser, setCurrentUser ] = useState( {} );
  useEffect(() => {
    const foundUser = users?.find( user => user.userName === "user" );
    if ( foundUser ) {
      setCurrentUser( foundUser );
    }
  }, [ users ] );
  const changeChecked = () => {
    setChecked( !checked );
  }
  const isPositive = number => {
    return Number( number ) >= 0;
  }
  const calculateCalories = ( user ) => {
    let bmr, multiplier;
    const { gender, weight, height, age, activityLevel } = user;

    if ( gender == "M" ) {
        bmr = 66.47 + ( 6.24 * weight ) + ( 12.7 * height ) - ( 6.76 * age );
    }
    else {
        bmr = 65.51 + (4.34 * weight) + ( 4.7 * height ) - ( 4.7 * age )
    }

    switch ( activityLevel ) {
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
    }

    return bmr * multiplier;
  }
  const userValid = ( user ) => {
    if ( isPositive( user.weight ) && isPositive( user.height ) ) {
      return true;
    }
    return false;
  }

  // The submitExp submits the info from the form to the expense array
  const handleSubmit = ( event ) => {


    event.preventDefault();
    // If user filled in required fields
    if ( userValid( currentUser ) ) {
      fetch( 'http://localhost:8080/physical-data', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify( currentUser )
      })
      .then( res => res.json() )
      .then( data => setCurrentUser( prevCurrentUser => { return { ...prevCurrentUser, data } } ) );
      changeChecked();
    }

    // Else
    else {
      // Alert user to enter required fields
     window.alert( "Please correctly enter required fields" );
    }

    console.log( currentUser );
  }

   // The handleChange function gets current input from form
   const handleChange = ( event ) => {
    // Get user input
    const { name, value } = event.target;
    // return user input
    setCurrentUser( prevUser => { return { ...prevUser, [ name ]: value } } );
  }

  return (
      <div className = "page physical-data">
          { checked ? ( 
          <>
              <h1>Update your physical metrics, { currentUser.userName }</h1>
              <label htmlFor = "age">Age (years)</label>
              <input 
                id="age"
                name="age"
                value={ currentUser.age }
                type="number"
                onChange={ handleChange }
                required  
              />

              <label>Gender:</label>
              <label htmlFor="male">Male</label>    
              <input type="radio" onChange={ handleChange } id="male" name="gender" value="M" checked={ currentUser.gender === "M" }></input>
              
              
              <label htmlFor="female">Female</label>
              <input type="radio" onChange={ handleChange } id="female" name="gender" value="F" checked={ currentUser.gender === "F" }></input>
              <label>Activity Level:</label>
              <label htmlFor="0">0 (Sedentary activity, such as little or no exercise or a desk job)</label>    
              <input type="radio" onChange={ handleChange } id="0" name="activityLevel" value={0} checked={ currentUser.activityLevel == "0" }></input>
              
              
              <label htmlFor="1">1 (Light activity, such as exercise 1–3 days per week)</label>
              <input type="radio" onChange={ handleChange } id="1" name="activityLevel" value={1} checked={ currentUser.activityLevel == "1" }></input>
              <label htmlFor="2">2 (Moderate activity, such as exercise 3–5 days per week)</label>    
              <input type="radio" onChange={ handleChange } id="2" name="activityLevel" value={2} checked={ currentUser.activityLevel == "2" }></input>
              
              
              <label htmlFor="3">3 (Active activity, such as exercise 6–7 days per week)</label>
              <input type="radio" onChange={ handleChange } id="3" name="activityLevel" value={3} checked={ currentUser.activityLevel == "3" }></input>
              <label htmlFor="4">4 (Very active activity, such as hard exercise 6–7 days per week or a physical job)</label>    
              <input type="radio" onChange={ handleChange } id="4" name="activityLevel" value={4} checked={ currentUser.activityLevel == "4" }></input>
              <label htmlFor = "weight">Weight (lb)</label>
              <input 
                id="weight"
                name="weight"
                value={ currentUser.weight }
                type="number"
                onChange={ handleChange }
                required  
              />

              <label htmlFor = "height">Height (in)</label>
              <input 
                id="height"
                name="height"
                value={ currentUser.height }
                type="number"
                onChange={ handleChange }
                required  
              />
              <input
                type="submit"
                onClick = { handleSubmit }
              />
              <label htmlFor = "update">Press to cancel update:</label>
              <input
                id = "update"
                type="checkbox"
                defaultChecked = { checked }
                onClick={ changeChecked }
              />
          </>
          ):(
          <>
            <h1>Here are your physical metrics, { currentUser.userName }</h1>
            <p>Weight (lb): { currentUser.weight }</p>
            <p>Height (in): { currentUser.height }</p>
            <p>Caloric Intake: { calculateCalories( currentUser ) }</p>
            <label htmlFor = "update">Press to update info:</label>
            <input
                id = "update"
                type="checkbox"
                defaultChecked = { checked }
                onClick={ changeChecked }
            />
          </>
          )}
      </div>
  );
}