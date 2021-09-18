import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub} from './Helper.js'
import {FloatingLabel, Form, Button, Dropdown, Alert} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';

//카드의 컬러 index는 seq / 10의 나머지값으로 함
function ProjectList(p){
  return(
    <>
      <div className="pListTop outerWrap">
        <div className="innerWrap">
          <img src={pub.img+'logo.svg'}/>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
              test@gmail.com
            </Dropdown.Toggle>

            <Dropdown.Menu style={{'minWidth':'unset','width':'100%'}}>
              
              <Dropdown.Item style={{'fontSize':'.8rem'}}>프로젝트 생성</Dropdown.Item>
              <Dropdown.Item href="sign/login" style={{'fontSize':'.8rem'}}>로그아웃</Dropdown.Item>
            
            </Dropdown.Menu>
          </Dropdown>
        </div>
        
      </div>

      <div className="outerWrap">
        <div className="innerWrap pListWrap">
          <h4 className="active">진행중인 프로젝트 &#x1F680;</h4>
          <div className="cardWrap">
            <NoProject title="진행중인 프로젝트"/>
          </div>
          <h4 className="inActive">완료된 프로젝트 &#x1F648;</h4>
          <div className="cardWrap">
            <NoProject title="완료된 프로젝트"/>
          </div>
        </div>
      </div>
      
    </>
  )
}

function ProjectCard(p){
  return(
    <div className="projectCard">
      {p.id}
    </div>
  )
}
function NoProject(p){
  return(
    <div className="noProjectMsg">
      {p.title}가 없습니다.
    </div>

  )
}



function transReducer(state){
  return {
    signLogoTrans : state.signLogoTrans
  }
}

export default connect(transReducer)(ProjectList);