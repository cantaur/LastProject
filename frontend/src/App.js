// import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {pub} from './comp/Helper.js'
import Login from './comp/Login.js'



function App() {
  const pubimg = process.env.PUBLIC_URL + '/img/'; 
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch('/api/hello')
    .then(response => response.text())
    .then(message => {
      setMessage(message);
    });
    
  },[])

  return (
    <>
      <img src={pub.img+'logo.png'}/>
      <Login/>
    </>
  );
}

export default App;
