import {React, useEffect, useState}  from 'react';
import api from '../api/api'
import { useAuth } from '../uttil/AuthContext';
export default function Home() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();
  useEffect(()=>{
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    api.get("/api/users/") // Fetch data from the API
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

