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

function Test2(p){

  return(
    <div className="viewOutWrap">
      <Header/>
      <div style={{padding:"80px"}}>
        <p>컴포넌트 경로 : src/comp/Test2.js</p>
        <hr/>
        <p>모듈 추가시 꼭 --save를 붙혀주세요.</p>
        <p>예시: npm install react-redux --save (yarn 사용시 yarn add react-redux --save)</p>
        <p>페이지 추가시 App.js에서 Test 컴포넌트 있는 부분 보시고 추가하시면 됩니당 잘 안되면 문의</p>
        <p>그 외에는 마음대로 작업하세용 다 지워도댐 ㄱㄱㄱ</p>
      </div>
      
      <Side/>
    </div>
  )
}
function Header(p){
  return(
    <div className="viewHead" style={{backgroundColor:"#fafafa"}}>
      <div className="pathWrap">
        <Form.Select size="sm">
          <option>테스트 프로젝트 1</option>
          <option>샘플 프로젝트</option>
        </Form.Select>
        <b className="pathBar"><i class="fas fa-caret-right" style={pColor}></i></b>
        <Form.Select size="sm">
          <option>샘플 마일스톤이덩</option>
          <option>샘플업무당</option>
        </Form.Select>
        <b className="pathBar"><i class="fas fa-caret-right" style={pColor}></i></b>
        <Form.Select size="sm">
          <option>샘플업무당2</option>
          <option>샘플업무당1</option>
        </Form.Select>
      </div>
      <div className="rightWrap">
        <div className="searchBox">
          <Form.Control type="text" size='sm' placeholder="검색어를 입력해주세요." />
          <i class="fas fa-search" style={pColor}></i>
        </div>
        <div className="noticeWrap">
          <i class="far fa-bell"></i>
          <div className="bellCnt"></div>
        </div>
      </div>
    </div>
  )
}
function Side(p){
  return(
    <div className="viewSide" style={{backgroundColor:'#038D7F20'}}>
      <div className="prjIcon" style={pColorB}>프</div>
    </div>
  )

}



function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(Test2);