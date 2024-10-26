// Imports
import useFetch from "../hooks/useFetch.js";

// Will return a "container" for the header of the website
export default function PhysicalData() {
  const data = useFetch('/api/physical-data');
  return (
          <h1>{data}</h1>
  )
}