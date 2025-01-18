import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Dashboard = () => {
  const[suc,setsucc]=useState()
  const navigate = useNavigate()
  axios.defaults.withCredentials=true
  useEffect(()=>{
    
    // Send a request to the server to authenticate the user
    axios
      .get("http://localhost:3001/Dashboard", { email, password })
      .then((res) => {
        if(res.data === 'success'){
          setsucc('succeeded ok')
        }
        else{
          navigate('/')
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to log in. Please try again.");
      });

  },[])
  return (
    <div>
      <h2>dashboard</h2>
      <p>{suc}</p>
    </div>
  )
}

export default Dashboard
