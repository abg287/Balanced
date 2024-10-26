// Imports
import useFetch from '../hooks/useFetch.js';

// Will return a "container" for the header of the website
export default function AddMeal() {
  const data = useFetch('/api/add-meals');
  return (
          <h1>{data}</h1>
  )
}