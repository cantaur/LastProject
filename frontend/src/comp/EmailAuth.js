import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub} from './Helper.js'
import {FloatingLabel, Form, Button} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';



function EmailAuth(p){

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }


  
  const history = useHistory()
  const email = getParameterByName('email')
  const authKey = getParameterByName('authKey')
  useEffect(()=>{
    if(!authKey){
      history.push('/err')
    }else {
      if(!email){
        history.push('/err')
      }
    }

  },[])
  

  return(
    <>
      <div className="loginBack">
        <div className="loginCon emailAuthCon">
          <div className="checkDiv">
            <i class="fas fa-check"></i>
          </div>
          <p className="emailText">{email}</p>
          <div className="msgBox">
            계정의 인증이 완료되었습니다.
            <br/>
            가입한 정보로 로그인 해주세요.
          </div>
          <Button className="registBtn" onClick={()=>{
            history.push('/sign/login')
          }}>로그인 하러가기</Button>
        </div>
      </div>
    </>
  )
}
function transReducer(state){
  return {
    loading : state.loading
  }
}

export default connect(transReducer)(EmailAuth);