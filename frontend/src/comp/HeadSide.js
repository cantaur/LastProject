import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors} from './Helper.js'
import DatePicker from './DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';

const pColorB = {
  backgroundColor: '#038D7F',
}

const pColor = {
  color: '#038D7F',
}
const pColorBo = {
  borderColor: '#038D7F',
}

function HeadSide(){
  return(
    <>
      {/* 헤더 */}
      <div className="viewHead" style={{backgroundColor:"#fafafa"}}>
        <div className="pathWrap">
          <Form.Select size="sm">
            <option>테스트 프로젝트 1</option>
            <option>샘플 프로젝트</option>
          </Form.Select>
          <b className="pathBar"><i class="fas fa-caret-right"></i></b>
          <Form.Select size="sm">
            <option>샘플 마일스톤이덩</option>
            <option>샘플업무당</option>
          </Form.Select>
          <b className="pathBar"><i class="fas fa-caret-right"></i></b>
          <Form.Select size="sm">
            <option>샘플업무당2</option>
            <option>샘플업무당1</option>
          </Form.Select>
        </div>
        <div className="rightWrap">
          <i class="fas fa-search searchBtn"></i>

          <div className="noticeWrap">
            <i class="far fa-bell"></i>
            <div className="bellCnt"></div>
          </div>
        </div>
      </div>
      {/* 사이드 */}
      <div className="viewSide" style={{backgroundColor:'#038D7F20'}}>
        <div className="prjIcon" style={pColorB}>프</div>

        <div className="pageIconWrap">
          <i class="fas fa-home tipRightBox on" style={pColor}>
            <p className="tipRight">내 업무</p>
          </i>
          <i class="fas fa-tachometer-alt tipRightBox" style={pColor}>
            <p className="tipRight">프로젝트</p>
          </i>

          <i class="fas fa-flag tipRightBox" style={pColor}>
            <p className="tipRight">마일스톤</p>
          </i>
          <i class="fas fa-briefcase tipRightBox" style={pColor}>
            <p className="tipRight">업무</p>
          </i>
        </div>


        <div className="memberIconWrap">
          <div className="memberIcon tipRightBox">
            <p className="tipRight">멤버 설정</p>
            <i class="fas fa-users" style={pColor}></i>
          </div>
          <div className="profile tipRightBox">
            <p className="tipRight">프로필 설정</p>
            <div className="profileIcon">
              <img src={pub.img+'defaultProfile.svg'}/>
            </div>
          </div>

        </div>
        
      </div>
    </>
  )
}
function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(HeadSide);