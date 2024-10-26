// Imports
import useFetch from '../hooks/useFetch.js';

// Will return a "container" for the header of the website
export default function Home() {
    const data = useFetch('/api/home');
    return (
            <h1>{data}</h1>
    )
}