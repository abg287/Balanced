// Imports
import useFetch from '../hooks/useFetch.js';
import Food from "./Food.jsx";

// Will return a "container" for the header of the website
export default function Home() {
    const foods = useFetch('/api/home');

    let caloriesSum = 0;

    foods?.map( ( food ) => {
        caloriesSum += food.calories;
    })
    
    return (
            <div className = "page foods">
                <h1>Foods Eaten</h1>
                { foods?.map( ( food, index ) => {
                    return (
                        <Food 
                            key = { index }
                            name = { food.name }
                            calories = { food.calories }
                        />
                    );
                })}
                <p>Total Calories: { caloriesSum }</p>
            </div>
    );
}