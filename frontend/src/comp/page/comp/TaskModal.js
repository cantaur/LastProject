import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react"
import DatePicker from '../../DatePicker.js'

import {pub, host, colors, pages, seqColorTrans} from '../../Helper.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';



function TaskModal(p){

  const taskColor = seqColorTrans(p.taskModalData.task_seq)

  // 업무 제목
  let [titleData, titleDataCng] = useState();
  // 업무 내용
  let [contentData, contentDataCng] = useState();
  // 업무 일정
  let [dateData, dateDataCng]= useState({
    task_startdate:'',
    task_duedate:''
  });
  // 업무 라벨
  let [labelData,labelDataCng]= useState();

  // 업무 작성자정보
  let [writerData, writerDataCng] = useState({
    projmember_name : '',
    projmember_email : '',
    projmember_data : '',
  });

  // 배정된 멤버 삭제 확인용
  let [deleteMemberAlert, deleteMemberAlertCng] = useState(false)
  const alertClose =()=> deleteMemberAlertCng(false);
  let [deleteMemberName, deleteMemberNameCng] =useState();

  // 데이트픽커 이중모달 컨트롤
  const dateModalClose =useCallback((e)=>{
    if(!e.target.closest('.DayPicker_1') && !e.target.closest('.datePickerEmptyDate') ){
      p.dispatch({type:'modalOff'})
      setTimeout(()=>{
        window.removeEventListener('click', dateModalClose)
      })
    }
  },[])

  // 업무 일정 업데이트
  const taskDateUpdate = () =>{
    axios.post(host+'/ajax/updateTaskDate',{
      task_seq : p.taskModalData.task_seq,
      task_startdate : dateData.task_startdate,
      task_duedate : dateData.task_duedate,
    })
    .then(r=>{
      p.dispatch({type:'refreshCng'})
    })
  }

  // 업무일정 비우기
  const taskDateNull = () =>{
    dateDataCng({
      task_startdate:'',
      task_duedate:''
    })
  }
  

  // 탭 상태관리
  let [tabState, tabStateCng] = useState(0);

  
  //제목 수정모드
  let [editTitle, editTitleCng] = useState(false);
  const titleEditInput = useRef();

  //제목 미입력시
  let [titleAlert,titleAlertCng] = useState(false);

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
    titleDataCng(p.taskModalData.task_title)
    contentDataCng(p.taskModalData.task_content)
    dateDataCng({
      task_startdate:p.taskModalData.task_startdate,
      task_duedate:p.taskModalData.task_duedate
    })
    labelDataCng(p.taskModalData.label_title)
    if(p.memberList){
      p.memberList.forEach(r=>{
        if(r.projmember_seq == p.taskModalData.projmember_seq){
          writerDataCng(r)
        }
      })
    }
    editTitleCng(false)
    editContentCng(false)
    editLabelCng(false)
    
  },[p.taskModalData])

  console.log(p.taskModalData)
  return(
    <>
      <Modal show={deleteMemberAlert} onHide={alertClose} className="modalWrap deleteMemberModal">
        <Modal.Header style={{borderBottom:0}}>
          <Modal.Title className="modalTitle" >정말 {deleteMemberName}님을 업무배정에서 제외할까요?</Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{borderTop:0}}>
          <Button variant="secondary" onClick={alertClose} style={{fontSize:'.8rem'}}>
            취소
          </Button>
          <Button variant="danger" style={{fontSize:'.8rem'}}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={"taskModalWrap " + (p.taskModal?'on':'')}>
        
        <div className="head">
          <div className="titleWrap">
            <input className={"title " + (editTitle?'on ':'') + (titleAlert?'msg ':'')} 
              disabled={editTitle?false:true} 
              value={titleData} 
              ref={titleEditInput}
              onChange={e=>{
                titleDataCng(e.target.value)
              }}
              onKeyPress={e=>{
                if(e.key == 'Enter'){
                  if(titleData) {
                    titleAlertCng(false)
                    editTitleCng(false)
                  }else{
                    titleAlertCng(true)
                    titleEditInput.current.focus();
                  }
                }
              }}
            />
            {
              editTitle
              ?
                <p className="submitBtn labelEditBtn" onClick={()=>{
                  if(titleData) {
                    titleAlertCng(false)
                    editTitleCng(false)
                  }else{
                    titleAlertCng(true)
                    titleEditInput.current.focus();
                  }
                }}>수정완료</p>
              :
                <i class="fas fa-pen editBtn labelEditBtn" onClick={()=>{
                  editTitleCng(true)
                  setTimeout(()=>{
                    titleEditInput.current.focus();
                  })
                }}></i>

            }
            
          </div>
          
          <div className="info">
            <div className="profile">
              <div className="img">
                <img src={
                  writerData.projmember_data
                  ? 
                  'data:image;base64,'+writerData.projmember_data
                  :
                    pub.img+'defaultProfile.svg'
                }/>
              </div>

              <div className="text">
                <p className="name">{writerData.projmember_name?writerData.projmember_name:'#'+writerData.projmember_seq}</p>
                <p className="email">{writerData.member_email}</p>
              </div>
            </div>
            {/* <p className="date">2020-12-12</p> */}

          </div>
        </div>

        <div className="tabNav">
          <p className={"navBtn "+(tabState==0?'on':'')}
              style={{
                color:(tabState==0?taskColor:''),
                borderColor:(tabState==0?taskColor:''),
                fontWeight:(tabState==0?'bold':''),
              }}
              onClick={()=>{tabStateCng(0)}}>
            상세보기
          </p>
          <p className={"navBtn "+(tabState==1?'on':'')} 
              style={{
                color:(tabState==1?taskColor:''),
                borderColor:(tabState==1?taskColor:''),
                fontWeight:(tabState==1?'bold':''),
              }}
              onClick={()=>{tabStateCng(1)}}>
            코멘트
          </p>
          <p className={"navBtn "+(tabState==2?'on':'')} 
              style={{
                color:(tabState==2?taskColor:''),
                borderColor:(tabState==2?taskColor:''),
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
                <div className="conBtn editBtn toolTipTopBox" onClick={()=>{
                  editContentCng(true)
                  conArea.current.focus();
                }}
                >
                  <p className="toolTip" style={{marginLeft:'-24px'}}>내용수정</p>

                  <i class="fas fa-pen"></i>
                </div>
                <div className="conBtn submitBtn toolTipTopBox" onClick={()=>{
                  editContentCng(false)
                }}
                >
                  수정완료
                </div>
                <textarea className="conArea" ref={conArea}
                  readOnly={editContent?false:true} 
                  placeholder="업무내용이 없습니다."
                  value={contentData}
                  onChange={e=>{
                    contentDataCng(e.target.value)
                  }}
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
                          <option value={r.milestone_seq} selected={r.milestone_seq==p.taskModalData.milestone_seq?true:false}>{r.milestone_title}</option>
                        )
                      })
                  }
                </Form.Select>
              </div>

              <div className="statusRow">
                <p className="label">업무일정</p>
                <div className="dateWrap datePickerWrap">
                  {
                    !dateData.task_startdate &&
                    <p className="date">일정없음</p>
                  }
                  {
                    dateData.task_startdate &&
                    <p className="date">
                    {dateData.task_startdate?dateData.task_startdate + ' ':''}
                    ~
                    {dateData.task_duedate?' '+dateData.task_duedate:''}
                  </p>
                  }
                  
                  <div className="dateBtn" onClick={
                    ()=>{
                      p.dispatch({type:'modalOn'})
                      setTimeout(()=>{
                        window.addEventListener('click', dateModalClose)
                      })
                    }
                  }>
                    <i className="far fa-calendar-check"></i>
                    일정선택
                  </div>
                  <DatePicker
                    pickerStartDate={dateData.task_startdate}
                    pickerEndDate={dateData.task_duedate}
                    pickerDateCng={dateDataCng}
                    pickerDate={dateData}
                    pickerStartKey={'task_startdate'}
                    pickerEndKey={'task_duedate'}
                    dateModalClose={dateModalClose}
                    completeKey={true}
                    dateUpdate={taskDateUpdate}
                    dateEmpty={taskDateNull}
                  />
                </div>
              </div>

              <div className="statusRow">
                <p className="label">배정된 멤버</p>
                <div className="memberOuter">
                  <div className="memberWrap">
                    {
                      p.taskModalData.taskMembers &&
                      p.taskModalData.taskMembers.length > 0 
                      ? 
                        p.taskModalData.taskMembers.map(r=>{
                          let name = '';
                          let data = '';
                          p.memberList.map(m=>{
                            if(m.projmember_seq==r.projmember_seq) {
                              name = m.projmember_name;
                              data = m.projmember_data;
                            }
                          })
                          
                          return(
                            <div className="profileImg toolTipTopBox" onClick={()=>{
                              deleteMemberAlertCng(true)
                              if(name){
                                deleteMemberNameCng(name)
                              }else {
                                deleteMemberNameCng('#'+r.projmember_seq)
                              }
                            }}>
                              <p className="toolTip">{name?name:'#'+r.projmember_seq}</p>
                              <div>
                                <img src={
                                  data
                                  ? 
                                  'data:image;base64,'+data
                                  :
                                    pub.img+'defaultProfile.svg'
                                }/>
                              </div>
                            </div>
                          )
                        })
                      :
                        <p className="msg">멤버 없음</p>
                    }
                    

                  </div>
                  <div className="chargeBtn"
                        onClick={()=>{
                          setTimeout(()=>{
                            appendMemberModalCng(true)
                            window.addEventListener('click', appendMemberModalClose)
                          })
                          
                        }}
                  >
                    <i class="fas fa-plus-square"></i>
                    <div className={"chrgeWrap "+(appendMemberModal?'on':'')}>
                      {
                        p.memberList &&
                        p.memberList.map(r=>{
                          return(
                            <div className="member">
                              <div className="profile">
                                <img src={
                                  r.projmember_data
                                  ? 
                                  'data:image;base64,'+r.projmember_data
                                  :
                                    pub.img+'defaultProfile.svg'
                                }/>
                              </div>
                              <div className="info">
                                <p className="name">{r.projmember_name?r.projmember_name:'#'+r.projmember_seq}</p>
                                <p className="email">r.projmember_email</p>
                              </div>
                              <p className="append">배정</p>
                            </div>
                          )
                        })
                      }
                      
                      
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
                        <input type="text" className="labelInput" ref={labelInput} value={labelData} onChange={e=>{
                          labelDataCng(e.target.value)
                        }}
                        onKeyPress={e=>{
                          if(e.key == "Enter"){
                            axios.post(host+'/ajax/addLabel',{
                              taskSeq:p.taskModalData.task_seq,
                              label:labelData,
                            })
                            .then(r=>{
                              editLabelCng(false)
                            })
                            .catch(e=>{
                              console.log(e)
                            })
                          }
                        }}
                        />
                        <p className="submitBtn labelEditBtn" onClick={()=>{
                          axios.post(host+'/ajax/addLabel',{
                            taskSeq:p.taskModalData.task_seq,
                            label:labelData,
                          })
                          .then(r=>{
                            editLabelCng(false)
                          })
                          .catch(e=>{
                            console.log(e)
                          })
                          
                        }}>수정완료</p>
                      </>
                    :
                      <>
                        {
                          p.taskModalData.label_seq
                          ?
                            <p className="labelText" style={{
                              backgroundColor:seqColorTrans(p.taskModalData.label_seq)
                            }}>{p.taskModalData.label_title}</p>
                          :
                            <p className="labelText noLabel">라벨 없음</p>
                        }
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
                  <option value="" selected={p.taskModalData.priority_code?false:true}>중요도 없음</option>
                  <option value="10" selected={p.taskModalData.priority_code == "10"?true:false}>긴급</option>
                  <option value="20" selected={p.taskModalData.priority_code == "20"?true:false}>높음</option>
                  <option value="30" selected={p.taskModalData.priority_code == "30"?true:false}>보통</option>
                  <option value="40" selected={p.taskModalData.priority_code == "40"?true:false}>낮음</option>
                  <option value="50" selected={p.taskModalData.priority_code == "50"?true:false}>무시</option>
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
    taskModalData : state.taskModalData,
    refresh : state.refresh,
  }
}

export default connect(transReducer)(TaskModal);