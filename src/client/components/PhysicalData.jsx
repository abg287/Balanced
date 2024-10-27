// Imports
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.js";

// Will return a "container" for the header of the website
export default function PhysicalData() {

  const users = useFetch( "/api/physical-data" );
  const [ isUpdating, setIsUpdating ] = useState( false );
  const [ currentUser, setCurrentUser ] = useState( {} );

  useEffect(() => {
    const foundUser = users?.find( user => user.userName === "user" );
    if ( foundUser ) {
      setCurrentUser( foundUser );
    }
  }, [ users ] );

  const changeIsUpdating = () => {
    setIsUpdating( !isUpdating );
  }

  const isPositive = number => {
    return Number( number ) >= 0;
    
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
      .then( data => setFood( prevCurrentUser => { return { ...prevCurrentUser, data } } ) );

      changeIsUpdating();
    }

    // Else
    else {
      // Alert user to enter required fields
      alert( "Please correctly enter required fields" );
    }
  }

   // The handleChange function gets current input from form
   const handleChange = ( event ) => {
    // Get user input
    const { name, value } = event.target;
    // return user input
    setCurrentUser( prevUser => { return { ...prevUser, [ name ]: value } } );
  }

  return (
      <div>
          { isUpdating ? ( 
            <>
              <h1>Update your physical metrics, { currentUser.username }</h1>
              <label for = "weight">Weight (lb)</label>
              <input 
                id="weight"
                name="weight"
                value={ currentUser.weight }
                type="number"
                onChange={ handleChange }
                required  
              />

              <label for = "height">Height (in)</label>
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
            </>
          ):(
          <>
            <h1>Here are your physical metrics, { currentUser.userName }</h1>
            <p>Weight (lb): { currentUser.weight }</p>
            <p>Height (in): { currentUser.height }</p>
            <input
                type="checkbox"
                onClick={ changeIsUpdating }
              />
          </>
          )}
      </div>
  );
}