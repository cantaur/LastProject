import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub} from './Helper.js'
import {FloatingLabel, Form, Button} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';



function RegistEmail(p){

  let [signUpId, signUpIdCng] = useState('');
  let [signUpPw, signUpPwCng] = useState('');


  let { type } = useParams();
  const history = useHistory()


  // useEffect(()=>{
  //   if(type == 'login'){
  //     console.log('로그인')
  //   }else if(type == 'signup'){
  //     console.log('회원가입')

  //   }else {
  //     history.push('/sign/login')
  //   }
  // })
  

  return(
    <>
      <div className="loginBack">
        <div className="loginCon">
          
        </div>
        
      </div>
    </>
  )
}
function transReducer(state){
  return {
    signLogoTrans : state.signLogoTrans
  }
}

export default connect(transReducer)(RegistEmail);