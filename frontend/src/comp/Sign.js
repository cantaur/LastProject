import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub} from './Helper.js'
import {FloatingLabel, Form, Button} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';



function Sign(p){
  // let { type } = useParams();
  const history = useHistory()
  let type = p.type;
  // useEffect(()=>{
  //   if(type == 'login'){
  //     console.log('로그인')
  //   }else if(type == 'regist'){
  //     console.log('회원가입')

  //   }else {
  //     history.push('/sign/login')
  //   }
  // })
  

  return(
    <>
      <div className="loginBack">
        <div className="loginCon">
          <div className={"logoWrap " + (type=='regist'?"logoTrans":"")}>
            <img src={pub.img+'logo.svg'} className="logo"/>
            <p>회원가입</p>
          </div>
          <div className="form">
            {
              type=='login' &&
                <>
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="이메일 주소"
                    >
                      <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel controlId="floatingPassword" label="비밀번호">
                      <Form.Control type="password" placeholder="비밀번호" />
                    </FloatingLabel>
                  </Form.Group>
                </>
            }
            {
              type=='regist' &&
              <>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="이메일 주소"
                  >
                    <Form.Control type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <FloatingLabel controlId="floatingPassword" label="비밀번호">
                    <Form.Control type="password" placeholder="비밀번호" />
                  </FloatingLabel>
                </Form.Group>
              </>
            }
            <Form.Group className={type=='regist'?'mb-3':'close'} controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="비밀번호 확인">
                <Form.Control type="password" placeholder="비밀번호 확인" />
              </FloatingLabel>
            </Form.Group>   
            
            {
              type=='login' &&
                <>
                  <Button className="loginBtn">로그인</Button>
                  <Link to="/regist" className="registBtn btn btn-primary">회원가입</Link>
                </>
            }
            {
              type=='regist' &&
              <>
                <Button className="loginBtn" disabled>가입하기</Button>
                <Link to="/" className="registBtn btn btn-primary">로그인으로 돌아가기</Link>
              </>
            }
            

            
          </div>
          <div className={'social ' + (type=='regist'?'close':'')}>
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
function transReducer(state){
  return {
    signLogoTrans : state.signLogoTrans
  }
}

export default connect(transReducer)(Sign);