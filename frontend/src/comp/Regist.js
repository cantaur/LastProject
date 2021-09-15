import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub} from './Helper.js'
import {FloatingLabel, Form, Button} from 'react-bootstrap'
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';





function Regist(p){
  console.log(p.signLogoTrans)
  useEffect(()=>{
    setTimeout(()=>{
      p.signLogoTrans
      ?p.dispatch({type:'open'})
      :p.dispatch({type:'close'})
    },300)
   
  })
  console.log(p.signLogoTrans)

  return(
    
    <>
      <div className="loginBack">
        <div className="loginCon registCon">
          <CSSTransition in={p.signLogoTrans} classNames="logoTrans" timeout={500}>
            <img src={pub.img+'logo.svg'} className="logo"/>
          </CSSTransition>
          <div className="form">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="이메일 주소"
                  className="mb-3"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="비밀번호">
                  <Form.Control type="password" placeholder="비밀번호" />
                </FloatingLabel>
              </Form.Group>
              
              <Link to="/regist" className="loginBtn btn btn-primary">회원가입</Link>

              <Link to="/login" className="registBtn btn btn-primary">돌아가기</Link>

            </Form>
          </div>
          
          <p className="info">Copyright © pium 2021.</p>
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

export default connect(transReducer)(Regist);