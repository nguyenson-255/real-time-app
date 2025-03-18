import {React, useEffect, useState}  from 'react';
import api from '../api/api'
export default function Home() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    api
      .get("/api/users/") // Fetch data from the API
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  },[])

  return (
    <div>
      <h1>Welcome to Home Page   aaa</h1>
      <p>This is a React class component.</p>
      <p>{data}</p>
    </div>
  );
}

