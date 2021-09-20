
import React, {useState, useEffect} from 'react';
import {pub} from './comp/Helper.js'
import './css/common.scss';

import Sign from './comp/Sign.js'
import EmailAuth from './comp/EmailAuth.js'
import EmailSend from './comp/EmailSend.js'
import Test from './comp/Test.js'
import ErrPage from './comp/ErrPage.js'
import NonePage from './comp/NonePage.js'
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
      <Switch>
        <Route path='/sign/:type' exact>
          <Sign/>
        </Route>
        <Route path='/sign' exact>
          <Sign/>
        </Route>

        <Route path='/login' exact>
          <Sign/>
        </Route>

        <Route path='/member/signUpConfirm' exact>
          <EmailAuth/>
        </Route>

        <Route path='/emailSend/:email' exact>
          <EmailSend/>
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

        <Route path='/err' exact>
          <ErrPage/>
        </Route>

        <Route>
          <NonePage/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
