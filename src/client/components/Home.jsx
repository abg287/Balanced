// Imports
import { useState, useEffect } from "react";
import useFetch from '../hooks/useFetch.js';
import Food from "./Food.jsx";

// Will return a "container" for the header of the website
export default function Home() {
    const data = useFetch( "/api/home" );
    const [ foods, setFoods ] = useState([]);
    useEffect( () => {
        if ( data ) {
            setFoods( [ ...data ] );   
        }
    }, [ data ] );

    console.log( foods );

    let caloriesSum = 0;

    foods?.map( ( food ) => {
        caloriesSum += food.calories;
    });

    const deleteFood = async ( idx ) => {

        const foodToDelete = foods[ idx ];

        try {
            const response = await fetch( 'http://localhost:8080/food', {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( { name: foodToDelete.name } )
            });
            
            if ( response.ok ) {
                const filteredFoods = foods.filter( ( food, index ) => index !== idx );

                setFoods( filteredFoods );
            }

            else {
                console.error( "Failed to delete food." );
            }
        }

        catch ( error ) {
            console.error( "Error deleting food item: ", error );
        }
        
    }  
    
    return (
            <div className = "page foods">
                <h1>Foods Eaten</h1>
                { foods?.map( ( food, index ) => {
                    return (
                        <Food 
                            key = { index }
                            index = { index }
                            name = { food.name }
                            calories = { food.calories }
                            deleteFood = { deleteFood }
                        />
                    );
                })}
                <p>Total Calories: { caloriesSum }</p>
            </div>
    );
}
