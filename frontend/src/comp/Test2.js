import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors} from './Helper.js'
import DatePicker from './DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


const pColorB = {
  backgroundColor: '#038D7F',
}

const pColor = {
color: '#038D7F',
}

function Test2(p){

  return(
    <div className="viewOutWrap" style={{overflow:"scroll"}}>
      <Header/>
      <div style={{padding:"80px"}}>
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
        />
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