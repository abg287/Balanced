// Imports
import { useState, useEffect } from "react";
import useFetch from '../hooks/useFetch.js';
import Food from "./Food.jsx";
import MealPlan from "./MealPlan.jsx";

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
            <div id = "HomeApp">
                <p id = "HomeFoodsEaten">Foods Eaten</p>
                <p id = "HomeCaloriesCount">Total Calories: { caloriesSum }</p>
                { foods?.map( ( food, index ) => {
                    return (
                        <Food
                            key = { index }
                            index = { index }
                            name = { food.name }
                            calories = { food.calories }
                            totalFat = { food.totalFat }
                            totalCarbs = { food.totalCarbs }
                            protein = { food.protein }
                            sugars = { food.sugars }
                            deleteFood = { deleteFood }
                        />
                    );
                })}
                <MealPlan 
                    foods = { foods }
                />
            </div>
    );
}
