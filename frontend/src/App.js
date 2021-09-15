// import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';


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
  console.log(process.env.PUBLIC_URL)

  return (
    <div className="App">
      <header className="App-header">
        <img src={pubimg+'logo.png'} alt="" />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {message}
        </a>
      </header>
    </div>
  );
}

export default App;
