import {useEffect, useState} from 'react';

export default function useFetch(path) {
  const [data, setData] = useState();

  const HOST = process.env.SERVER_HOST || "localhost";
  const PORT = process.env.SERVER_PORT || "8080";
  
  useEffect(() => {
    // Cancel the fetch request
    const controller = new AbortController();
    const {signal} = controller;

    fetch(`http://${HOST}:${PORT}${path}`, {signal})
      .then( resp => resp.json() )
      .then( data => {setData( data ) }) 
      .catch( err => console.error(err));

    return () => {
      controller.abort();
    };
  }, []);

  return data;
}
