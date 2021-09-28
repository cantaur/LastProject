import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react"
import {pub, colors} from './Helper.js'
import DatePicker from './DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory, useLocation } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';




//페이지 정보 (왼쪽탭 활성화)
function pagePath(page){
  switch (page){
    case 'todo':
      return 0;
    case 'calender':
      return 1;
    case 'mileStone':
      return 2;
    case 'mileStoneView':
      return 2;
    case 'task':
      return 3;
  }
}


function HeadSide(p){
  const history = useHistory();
  //검색 모달 상태
  let [searchModal, searchModalCng] = useState(false);

  const pagePathNum = pagePath(p.pageInfo);

  //멤버 설정 모달 상태
  let [memberModal, memberModalCng] = useState(false);

  // 멤버 설정 모달_바깥클릭시 닫기 이벤트 핸들러
  let memberModalClose =useCallback((e)=>{
    if(!e.target.closest('.memberModalWrap') ){
      memberModalCng(false)
      setTimeout(()=>{
        window.removeEventListener('click', memberModalClose)
      })
    }
  },[])

  const [memberList, memeberListCng] = useState();


  useEffect(()=>{
    p.dispatch({type:'loadingOn'})
    axios.get('/ajax/allProjMembers/'+p.prjSeq)
    .then(r=>{
      console.log(r.data)
      imgCng(r.data[0].projmember_data)
      p.dispatch({type:'loadingOff'})
    })
    .catch(e=>{
      console.log(e)
      p.dispatch({type:'loadingOff'})
    })
  },{})

  return(
    <>
      {/* 헤더 */}
      <div className="viewHead" style={{backgroundColor:p.prjColor+'07'}}>
        <img src={'data:image;base64,'+img}/>
        <div className="pathWrap">
          <Form.Select size="sm">
            <option>테스트 프로젝트 1</option>
            <option>샘플 프로젝트</option>
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
        <div className="prjIcon tipRightBox" style={{backgroundColor:p.prjColor}} onClick={()=>{
          history.push('/project')
        }}>
          프
          <p className="tipRight r35">프로젝트 목록으로</p>
        </div>

        <div className="pageIconWrap">
          <i class={"fas fa-home tipRightBox " + (pagePathNum==0?'on':'')} style={{color:p.prjColor}} onClick={()=>{
            history.push('/project/'+p.prjSeq+'/todo')
            p.dispatch({type:'pagePush', val:'todo'});
          }}>
            <p className="tipRight">내 업무</p>
          </i>
          <i class={"fas fa-tachometer-alt tipRightBox " + (pagePathNum==1?'on':'')} style={{color:p.prjColor}} onClick={()=>{
            history.push('/project/'+p.prjSeq+'/calender')
            p.dispatch({type:'pagePush', val:'calender'});
          }}>
            <p className="tipRight">프로젝트</p>
          </i>

          <i class={"fas fa-flag tipRightBox " + (pagePathNum==2?'on':'')} style={{color:p.prjColor}} onClick={()=>{
            history.push('/project/'+p.prjSeq+'/mileStone')
            p.dispatch({type:'pagePush', val:'mileStone'});

          }}>
            <p className="tipRight">마일스톤</p>
          </i>
          <i class={"fas fa-briefcase tipRightBox "+ (pagePathNum==3?'on':'')} style={{color:p.prjColor}} onClick={()=>{
            history.push('/project/'+p.prjSeq+'/task')
            p.dispatch({type:'pagePush', val:'task'});

          }}>
            <p className="tipRight">업무</p>
          </i>
        </div>


        <div className="memberIconWrap">
          <div className={"memberIcon tipRightBox "+(memberModal?'off':'')} onClick={()=>{
            if(!memberModal){
              setTimeout(()=>{
                memberModalCng(true)
                window.addEventListener('click', memberModalClose)
              })
            }
          }}>
            
            <p className="tipRight r45">멤버 설정</p>
            <i class="fas fa-users" style={{color:p.prjColor}}></i>            
          </div>


          <div className="profile tipRightBox">
            <p className="tipRight r45">프로필 설정</p>
            <div className="profileIcon">
              <img src={pub.img+'defaultProfile.svg'}/>
            </div>
        </div>

        </div>
        <div className={"memberModalWrap " + (memberModal?'on':'')}>
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