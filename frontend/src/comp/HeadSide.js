import axios from "axios";
import React, { useEffect, useState, useRef } from "react"
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

function pagePath(page){
  switch (page){
    case 'kanban':
      return 0;
    case 'calender':
      return 1;
  }
}

function HeadSide(p){
  let [searchModal, searchModalCng] = useState(false);
  const pagePathNum = pagePath(p.pageInfo);

  

  useEffect(()=>{

    
  },[])
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
          <i class="fas fa-search searchBtn" onClick={()=>{searchModalCng(true);}}></i>

          <Modal className="searchBox" show={searchModal} onHide={()=>{searchModalCng(false)}}>
            <Modal.Header>
              <i class="fas fa-search" style={pColor}></i>
              <Form.Control type="text" placeholder="검색어를 입력해주세요." className="searchInput" ref="searchInput"/>
            </Modal.Header>
            <Modal.Body>
              {/* <p className="noMsg">검색결과가 없습니다.</p> */}
              <div className="result">
                <b style={pColorB}>마일스톤</b>
                <p>검색결과로 나온 마일스톤 이름</p>
              </div>
              <div className="result">
                <b style={pColorB}>업무</b>
                <p>검색결과로 나온 업무 이름</p>
              </div>
              <div className="result">
                <b style={pColorB}>프로젝트</b>
                <p>검색결과로 나온 업무 이름</p>
              </div>
            </Modal.Body>

          </Modal>

          <div className="noticeWrap">
            <i class="far fa-bell"></i>
            <div className="bellCnt"></div>
          </div>
        </div>

        
      </div>



      {/* 사이드 */}
      <div className="viewSide" style={{backgroundColor:'#038D7F20'}}>
        <div className="prjIcon tipRightBox" style={pColorB}>
          프
          <p className="tipRight r35">프로젝트 설정</p>
        </div>

        <div className="pageIconWrap">
          <i class={"fas fa-home tipRightBox " + (pagePathNum==0?'on':'')} style={pColor}>
            <p className="tipRight">내 업무</p>
          </i>
          <i class={"fas fa-tachometer-alt tipRightBox " + (pagePathNum==1?'on':'')} style={pColor}>
            <p className="tipRight">프로젝트</p>
          </i>

          <i class={"fas fa-flag tipRightBox " + (pagePathNum==2?'on':'')} style={pColor}>
            <p className="tipRight">마일스톤</p>
          </i>
          <i class={"fas fa-briefcase tipRightBox "+ (pagePathNum==3?'on':'')} style={pColor}>
            <p className="tipRight">업무</p>
          </i>
        </div>


        <div className="memberIconWrap">
          <div className={"memberIcon tipRightBox "}>
            <p className="tipRight r45">멤버 설정</p>
            <i class="fas fa-users" style={pColor}></i>            
          </div>
          {/* <div className={"memberModalWrap " + (memberModalAni?"on":"")} ref={modalEl}>
            zzz
          </div> */}

          <div className="profile tipRightBox">
            <p className="tipRight r45">프로필 설정</p>
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
    pageInfo : state.pageInfo
  }
}

export default connect(transReducer)(HeadSide);