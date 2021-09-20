
import React, {useState, useEffect} from 'react';
import {pub} from './comp/Helper.js'
import './css/common.scss';

import Sign from './comp/Sign.js'
import Test from './comp/Test.js'
import ProjectList from './comp/ProjectList.js'
import ProjectView from './comp/ProjectView.js'
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
      <Route path='/sign/:type' exact>
        <Sign/>
      </Route>
      <Route path='/login' exact>
        <Sign/>
      </Route>
      <Route path='/project' exact>
        <ProjectList/>
      </Route>
      <Route path='/project/:page/:seq' exact>
        <ProjectView/>
      </Route>
      <Route path='/' exact>
        <Sign/>
      </Route>
      <Route path='/test' exact>
        <Test/>
      </Route>
    </>
  );
}

export default App;
