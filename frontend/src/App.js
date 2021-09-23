
import React, {useState, useEffect} from 'react';
import {pub} from './comp/Helper.js'
import './css/common.scss';

import Sign from './comp/Sign.js'
import EmailAuth from './comp/EmailAuth.js'
import EmailSend from './comp/EmailSend.js'
import Test from './comp/Test.js'
import Test2 from './comp/Test2.js'
import ErrPage from './comp/ErrPage.js'
import NonePage from './comp/NonePage.js'
import ProjectList from './comp/ProjectList.js'
import ProjectView from './comp/ProjectView.js'
import {host} from './comp/Helper.js'

import axios from 'axios';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import {connect} from 'react-redux';







function App(p) {
  return (
    <Switch>
      <Route path='/' exact>
        <Sign/>
      </Route>
      <Route path='/sign/:type' exact>
        <Sign/>
      </Route>
      <Route path='/sign/:type/:fail' exact>
        <Sign/>
      </Route>
      <Route path='/sign' exact>
        <Sign/>
      </Route>

      <Route path='/login' exact>
        <Sign/>
      </Route>

      <Route path='/signUpConfirm' exact>
        <EmailAuth/>
      </Route>

      <Route path='/emailSend/:email' exact>
        <EmailSend/>
      </Route>
    
      <Route path='/' exact>
        <ProjectList/>
      </Route>
      <Route path='/project' exact>
        <ProjectList/>
      </Route>
      <Route path='/project/:seq/:page' exact>
        <ProjectView/>
      </Route>
        

      <Route path='/test' exact>
        <Test/>
      </Route>

      <Route path='/test2' exact>
        <Test2/>
      </Route>

      <Route path='/err' exact>
        <ErrPage/>
      </Route>

      <Route path='/404' exact>
        <NonePage/>
      </Route>

      <Route>
        <NonePage/>
      </Route>
    </Switch>

  );
}
function transReducer(state){
  return {
    loginUser : state.loginUser,
  }
}

export default connect(transReducer)(App);
