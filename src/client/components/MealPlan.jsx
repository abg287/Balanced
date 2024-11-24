import React, {useState, useEffect} from "react";
import useFetch from "../hooks/useFetch.js";
import PlannedMeal from "./PlannedMeal.jsx";

export default function MealPlan( props ) 
{

    const users = useFetch( "/api/physical-data" );

    const [ currentUser, setCurrentUser ] = useState( {} );

    useEffect(() => {
        const foundUser = users?.find( user => user.userName === "user" );
        if ( foundUser ) {
        setCurrentUser( foundUser );
    }}, [ users ] );

    const { foods } = props;

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
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

    const GetPlannedMeals = () => {

        let calories = 0;
        let plannedMeals = []
        let randomIndex;

        let caloricIntake = calculateCalories( currentUser );

        while ( calories < caloricIntake ) {

            randomIndex = getRandomInt( 0, foods.length );

            console.log( foods[ randomIndex ] );

            plannedMeals.push( foods[ randomIndex ] );

            calories += foods[ randomIndex ].calories;
        }

        return plannedMeals;
    }

    

    return (
        <>
            <h2>Meal Plan</h2>

            { foods == 0 ? <p>Developers are still recommending meal plan.</p> : GetPlannedMeals()?.map( ( food, index ) => {
                return (
                    <PlannedMeal
                        key = { index }
                        index = { index }
                        name = { food.name }
                        calories = { food.calories }
                    />
                );
            })}
        </>
    );
}