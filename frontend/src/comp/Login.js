import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub} from './Helper.js'
import {FloatingLabel, Form, Button} from 'react-bootstrap'



function Login(){
  return(
    <>
      <div className="loginBack">
        <div className="loginCon">
          <img src={pub.img+'logo.svg'} className="logo"/>
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
              
              <Button className="loginBtn" type="submit">로그인</Button>
              <Button className="registBtn">회원가입</Button>
            </Form>
          </div>
          <div className="social">
            <div className="socialWrap">
              <div className="socialBtn">
                <img src={pub.img+'google.png'}/>
              </div>
              <p className="toolTip" style={{'right':'-13px'}}><div></div>구글로 로그인</p>

            </div>

            <div className="socialWrap">

              <div className="socialBtn">
                <img src={pub.img+'naver.png'}/>
              </div>
              <p className="toolTip"><div></div>네이버로 로그인</p>

            </div>

            <div className="socialWrap">

              <div className="socialBtn">
                <img src={pub.img+'kakao.png'}/>
              </div>
              <p className="toolTip"><div></div>카카오로 로그인</p>

            </div>
          </div>
          
          <p className="info">Copyright © pium 2021.</p>
        </div>
        
      </div>
    </>
  )
}

export default Login;