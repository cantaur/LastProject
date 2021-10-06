import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react"
import DatePicker from '../../DatePicker.js'

import {pub, host, colors, pages, seqColorTrans} from '../../Helper.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';



function TaskModal(p){

  // 탭 상태관리
  let [tabState, tabStateCng] = useState(0);

  //제목 수정모드
  let [editTitle, editTitleCng] = useState(false);
  const titleEditInput = useRef();

  // 상세보기_업무내용 수정모드
  let [editContent, editContentCng] = useState(false);
  const conArea = useRef();

  // 상세보기_배정된 멤버 추가 모달
  let [appendMemberModal, appendMemberModalCng] = useState(false);

  const appendMemberModalClose =useCallback((e)=>{
    if(!e.target.closest('.chargeBtn')){
      appendMemberModalCng(false)
      setTimeout(()=>{
        window.removeEventListener('click', appendMemberModalClose)
      })
    }
  },[])

  // 상세보기_라벨 수정모드
  let [editLabel, editLabelCng] = useState(false);
  const labelInput = useRef();

  useEffect(()=>{
  },[])
  console.log(p.mileStoneList)
  return(
    <>
      <div className={"taskModalWrap " + (p.taskModal?'on':'')}>
        
        <div className="head">
          <div className="titleWrap">
            <input className={"title " + (editTitle?'on':'')} value={'업무타이틀입니다'} ref={titleEditInput}/>
            {
              editTitle
              ?
                <p className="submitBtn labelEditBtn" onClick={()=>{
                  editTitleCng(false)
                }}>수정완료</p>
              :
                <i class="fas fa-pen editBtn labelEditBtn" onClick={()=>{
                  editTitleCng(true)
                }}></i>

            }
            
          </div>
          
          <div className="info">
            <div className="profile">
              <div className="img">
                <img src={pub.img+'defaultProfile.svg'}/>
              </div>

              <div className="text">
                <p className="name">사용자</p>
                <p className="email">test@email.com</p>
              </div>
            </div>
            <p className="date">2020-12-12</p>

          </div>
        </div>

        <div className="tabNav">
          <p className={"navBtn "+(tabState==0?'on':'')}
              style={{
                color:(tabState==0?seqColorTrans(2):''),
                borderColor:(tabState==0?seqColorTrans(2):''),
                fontWeight:(tabState==0?'bold':''),
              }}
              onClick={()=>{tabStateCng(0)}}>
            상세보기
          </p>
          <p className={"navBtn "+(tabState==1?'on':'')} 
              style={{
                color:(tabState==1?seqColorTrans(2):''),
                borderColor:(tabState==1?seqColorTrans(2):''),
                fontWeight:(tabState==1?'bold':''),
              }}
              onClick={()=>{tabStateCng(1)}}>
            코멘트
          </p>
          <p className={"navBtn "+(tabState==2?'on':'')} 
              style={{
                color:(tabState==2?seqColorTrans(2):''),
                borderColor:(tabState==2?seqColorTrans(2):''),
                fontWeight:(tabState==2?'bold':''),
              }}
              onClick={()=>{tabStateCng(2)}}>
            파일
          </p>
        </div>

        <div className="taskCon">
          {
            tabState == 0 &&
            <>
              <div className={"contentWrap " + (editContent?'on':'')}>
                <div className="conBtn editBtn toolTipTopBox" style={{color:seqColorTrans(2)}} onClick={()=>{
                  editContentCng(true)
                  conArea.current.focus();
                }}
                >
                  <p className="toolTip" style={{marginLeft:'-24px'}}>내용수정</p>

                  <i class="fas fa-pen"></i>
                </div>
                <div className="conBtn submitBtn toolTipTopBox" style={{backgroundColor:seqColorTrans(2)}} onClick={()=>{
                  editContentCng(false)
                }}
                >
                  수정완료
                </div>
                <textarea className="conArea" ref={conArea}
                  readOnly={editContent?false:true} 
                  placeholder="업무내용이 없습니다."
                ></textarea>
              </div>
              <p className="menuTitle">속성변경</p>
              <div className="statusRow">
                <p className="label">마일스톤</p>
                
                <Form.Select size="sm" className="mileSelect">
                  {
                    p.mileStoneList &&
                      p.mileStoneList.map((r, i) =>{
                        return(
                          <option value={r.milestone_seq}>{r.milestone_title}</option>
                        )
                      })
                  }
                </Form.Select>
              </div>

              <div className="statusRow">
                <p className="label">업무일정</p>

              </div>

              <div className="statusRow">
                <p className="label">배정된 멤버</p>
                <div className="memberOuter">
                  <div className="memberWrap">
                    <div className="profileImg toolTipTopBox">
                      <p className="toolTip">사용자</p>
                      <div>
                        <img src={pub.img+'defaultProfile.svg'}/>
                      </div>
                    </div>
                    <div className="profileImg toolTipTopBox">
                      <p className="toolTip">사용자</p>
                      <div>
                        <img src={pub.img+'defaultProfile.svg'}/>
                      </div>
                    </div>
                    <div className="profileImg toolTipTopBox">
                      <p className="toolTip">사용자</p>
                      <div>
                        <img src={pub.img+'defaultProfile.svg'}/>
                      </div>
                    </div>
                    <div className="profileImg toolTipTopBox">
                      <p className="toolTip">사용자</p>
                      <div>
                        <img src={pub.img+'defaultProfile.svg'}/>
                      </div>
                    </div>
                    <div className="profileImg toolTipTopBox">
                      <p className="toolTip">사용자</p>
                      <div>
                        <img src={pub.img+'defaultProfile.svg'}/>
                      </div>
                    </div>
                    <div className="profileImg toolTipTopBox">
                      <p className="toolTip">사용자</p>
                      <div>
                        <img src={pub.img+'defaultProfile.svg'}/>
                      </div>
                    </div>
                  </div>
                  <div className="chargeBtn" style={{backgroundColor:seqColorTrans(2)}}
                        onClick={()=>{
                          setTimeout(()=>{
                            appendMemberModalCng(true)
                            window.addEventListener('click', appendMemberModalClose)
                          })
                          
                        }}
                  >
                    + 추가
                    <div className={"chrgeWrap "+(appendMemberModal?'on':'')}>

                      <div className="member">
                        <div className="profile">
                          <img src={pub.img+'defaultProfile.svg'}/>
                        </div>
                        <div className="info">
                          <p className="name">사용자</p>
                          <p className="email">test.gmail.com</p>
                        </div>
                        <p className="append" style={{backgroundColor:seqColorTrans(2)}}>배정</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="statusRow">
                <p className="label">라벨</p>
                <div className="labelEditWrap">

                  {
                    editLabel
                    ?
                      <>
                        <input type="text" className="labelInput" ref={labelInput} value="도움요청"/>
                        <p className="submitBtn labelEditBtn" style={{backgroundColor:seqColorTrans(2)}} onClick={()=>{
                          editLabelCng(false)
                          
                        }}>수정완료</p>
                      </>
                    :
                      <>
                        <p className="labelText" style={{backgroundColor:seqColorTrans(2)}}>도움요청</p>
                        <i class="editBtn labelEditBtn fas fa-pen toolTipTopBox" onClick={()=>{
                          editLabelCng(true)
                          setTimeout(()=>{
                            labelInput.current.focus()
                          })
                        }}>
                          <p className="toolTip" style={{marginLeft:'-24px'}}>라벨수정</p>
                        </i>
                      </>
                  }
                </div>
              </div>
              <div className="statusRow">
                <p className="label">중요도</p>
                <Form.Select size="sm">
                  <option value="">중요도 없음</option>
                  <option value="">긴급</option>
                  <option value="">높음</option>
                  <option value="">보통</option>
                </Form.Select>
              </div>
              


            </>
          }
        </div>
        


      </div>
    </>
  )
}


function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
    taskModal : state.taskModal,
    taskModalData : state.taskModalData,
    mileStoneList : state.mileStoneList,
    projectInfo : state.projectInfo,
    memberList : state.memberList,
  }
}

export default connect(transReducer)(TaskModal);