import {useEffect, useState} from 'react';

export default function useFetch(path) {
  const [data, setData] = useState({message: 'Loading...'});
  useEffect(() => {
    // Cancel the fetch request
    const controller = new AbortController();
    const {signal} = controller;

    fetch(`http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}${path}`, {signal})
      .then(resp => resp.json())
      .then(data => {setData(data);})
      .catch(err => console.error(err));

    return () => {
      controller.abort();
    };
  }, []);

  return data.message;
}