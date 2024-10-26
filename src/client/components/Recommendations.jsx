// Imports
import useFetch from '../hooks/useFetch.js';

// Will return a "container" for the header of the website
export default function Recommendations() {
  const data = useFetch('/api/recommendations');
  return (
          <h1>{data}</h1>
  )
}