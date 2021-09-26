import axios from "axios";
import React, { useEffect, useState, useRef } from "react"
import {pub, colors} from './Helper.js'
import DatePicker from './DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';





function pagePath(page){
  switch (page){
    case 'todo':
      return 0;
    case 'calender':
      return 1;
  }
}

//멤버 설정 모달 상태
// let [memberModal, memberModalCng] = useState('');
//멤버 설정 모달_바깥클릭시 닫기 이벤트 핸들러
// let memberModalClose =useCallback((e)=>{
//   if(!e.target.closest('.memberModalWrap') ){
//     setTimeout(()=>{
//       window.removeEventListener('click', memberModalClose)
//     })
//   }
// },[])

function HeadSide(p){
  let [searchModal, searchModalCng] = useState(false);
  const pagePathNum = pagePath(p.pageInfo);
  

  // useEffect(()=>{

    
  // },[])
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
          <i class="fas fa-search searchBtn" onClick={()=>{
            searchModalCng(true)
          }}></i>

          <Modal className="searchBox" show={searchModal} onHide={()=>{searchModalCng(false)}}>
            <Modal.Header>
              <i class="fas fa-search" style={{color:p.prjColor}}></i>
              <Form.Control type="text" placeholder="검색어를 입력해주세요." className="searchInput"/>
            </Modal.Header>
            <Modal.Body>
              <div className="result">
                <b style={{backgroundColor:p.prjColor}}>마일스톤</b>
                <p>검색결과로 나온 마일스톤 이름</p>
              </div>
              <div className="result">
                <b style={{backgroundColor:p.prjColor}}>업무</b>
                <p>검색결과로 나온 업무 이름</p>
              </div>
              <div className="result">
                <b style={{backgroundColor:p.prjColor}}>프로젝트</b>
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
      <div className="viewSide" style={{backgroundColor:p.prjColor+'20'}}>
        <div className="prjIcon tipRightBox" style={{backgroundColor:p.prjColor}}>
          프
          <p className="tipRight r35">프로젝트 설정</p>
        </div>

        <div className="pageIconWrap">
          <i class={"fas fa-home tipRightBox " + (pagePathNum==0?'on':'')} style={{color:p.prjColor}}>
            <p className="tipRight">내 업무</p>
          </i>
          <i class={"fas fa-tachometer-alt tipRightBox " + (pagePathNum==1?'on':'')} style={{color:p.prjColor}}>
            <p className="tipRight">프로젝트</p>
          </i>

          <i class={"fas fa-flag tipRightBox " + (pagePathNum==2?'on':'')} style={{color:p.prjColor}}>
            <p className="tipRight">마일스톤</p>
          </i>
          <i class={"fas fa-briefcase tipRightBox "+ (pagePathNum==3?'on':'')} style={{color:p.prjColor}}>
            <p className="tipRight">업무</p>
          </i>
        </div>


        <div className="memberIconWrap">
          {/* <div className={"memberIcon tipRightBox "} onClick={()=>{
            setTimeout(()=>{
              window.addEventListener('click', memberModalClose)
            })
          }}>
            <p className="tipRight r45">멤버 설정</p>
            <i class="fas fa-users" style={{color:p.prjColor}}></i>            
          </div> */}


          <div className="profile tipRightBox">
            <p className="tipRight r45">프로필 설정</p>
            <div className="profileIcon">
              <img src={pub.img+'defaultProfile.svg'}/>
            </div>
        </div>

        </div>
        <div className="memberModalWrap">
          <div className="inviteWrap">
            <input type="text" placeholder="초대할 이메일"/>
            <i class="fas fa-paper-plane" style={{color:p.prjColor}}></i>
          </div>

          <p className="memberCnt">참여중인 멤버 <b style={{color:p.prjColor}}>10</b></p>
          <div className="memberListWrap">

            <div className="memberList">
              <div className="profileImg">
                <img src="/img/defaultProfile.svg"/>
              </div>
              <div className="profileName">
                <p className="name">&#x1F451; 대화명1</p>
                <p className="email">test@gmail.com</p>

              </div>
            </div>
            <div className="memberList">
              <div className="profileImg">
                <img src="/img/defaultProfile.svg"/>
              </div>
              <div className="profileName">
                <p className="name">대화명222</p>
                <p className="email">test@gmail.com</p>

              </div>
            </div>
            <div className="memberList">
              <div className="profileImg">
                <img src="/img/defaultProfile.svg"/>
              </div>
              <div className="profileName">
                <p className="name"></p>
                <p className="email">test@gmail.com</p>

              </div>
            </div>
            <div className="memberList">
              <div className="profileImg">
                <img src="/img/defaultProfile.svg"/>
              </div>
              <div className="profileName">
                <p className="name"></p>
                <p className="email">test@gmail.com</p>

              </div>
            </div>

            <div className="memberList on">
              <div className="profileImg">
                <img src="/img/defaultProfile.svg"/>
              </div>
              <div className="profileName">
                <p className="name">아이디아이디</p>
                <p className="email">test@gmail.com</p>

              </div>
              <div className="memberBtnWrap">
                <p className="admin">관리자로</p>
                <p className="except">제외</p>
                
              </div>
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