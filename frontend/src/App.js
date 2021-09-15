
import React, {useState, useEffect} from 'react';
import {pub} from './comp/Helper.js'
import './css/common.scss';

import Login from './comp/Login.js'
import axios from 'axios';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";




function App() {
  
  let [logInCheck, logInCheckCng] = useState(false);

  useEffect(() => {
    axios.get('/pium/rest/session')
    .then((r)=>{
      logInCheckCng(r.data)
    })
    .catch((e)=>{
      console.error(e)
      logInCheckCng(false)
    })
    
  },[])


  return (
    <>
      <Router>
        <Login/>
      </Router>
    </>
  );
}

export default App;
