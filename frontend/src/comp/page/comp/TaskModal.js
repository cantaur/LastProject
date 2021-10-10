import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react"
import DatePicker from '../../DatePicker.js'

import {pub, host, colors, pages, seqColorTrans} from '../../Helper.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import { FileIcon, defaultStyles } from "react-file-icon";


function TaskModal(p){

  const taskColor = seqColorTrans(p.taskModalData.task_seq)

  //테스트 정보 새로고침
  const taskRefresh = () =>{
    axios.get(host+'/ajax/taskView/'+p.taskModalData.task_seq)
    .then(r=>{
      p.dispatch(
        {
          type:'taskModalDataCng',
          val:{
            "task_seq":r.data[0].task.task_seq,
            "task_title":r.data[0].task.task_title,
            "task_content":r.data[0].task.task_content,
            "task_status":r.data[0].task.task_status,
            "task_isdelete":r.data[0].task.task_isdelete,
            "task_startdate":r.data[0].task.task_startdate?r.data[0].task.task_startdate.substring(0,10):'',
            "task_duedate":r.data[0].task.task_duedate?r.data[0].task.task_duedate.substring(0,10):'',
            "projmember_seq":r.data[0].task.projmember_seq,
            "milestone_seq":r.data[0].task.milestone_seq,
            "label_seq":r.data[0].task.label_seq==0?null:r.data[0].task.label_seq,
            "label_title":r.data[0].label?r.data[0].label.label_title:null,
            "priority_code":r.data[0].task.priority_code,
            "taskMembers":r.data[0].taskMembers,
            "task_date":r.data[0].task.task_date.substring(0,10),
          }
        }
      )
      p.dispatch({type:'loadingOff'})
      p.dispatch({type:'refreshCng'})
    })
    .catch(e=>{
      console.log(e)
      p.dispatch({type:'loadingOff'})
    })
  }
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

  //업무 진행여부
  let [statusData, statusDataCng] =useState();
  // 업무 작성자정보
  let [writerData, writerDataCng] = useState({
    projmember_name : '',
    projmember_email : '',
    projmember_data : '',
  });

  // 배정된 멤버 삭제 확인용
  let [deleteMemberName, deleteMemberNameCng] =useState();
  let [deleteMemberSeq, deleteMemberSeqCng] =useState();

  let [deleteMemberAlert, deleteMemberAlertCng] = useState(false)

  const alertClose =()=> {
    deleteMemberAlertCng(false)
    setTimeout(()=>{
      deleteMemberNameCng();
      deleteMemberSeqCng();
    },500)
    
  };


  //  업무 삭제 확인용
  let [deleteTaskAlert, deleteTaskAlertCng] = useState(false)
  const taskAlertClose = () => deleteTaskAlertCng(false);

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
    .catch(e=>{
      console.log(e)
      p.dispatch({type:'loadingOff'})
    })
  }

  // 업무일정 비우기
  const taskDateNull = () =>{
    axios.post(host+'/ajax/updateTaskDate',{
      task_seq : p.taskModalData.task_seq,
      task_startdate : null,
      task_duedate : null,
    })
    .then(r=>{
      p.dispatch({type:'refreshCng'})
      dateDataCng({
        task_startdate:'',
        task_duedate:''
      })
      taskRefresh()
      p.dispatch({type:'modalOff'})
    })
    .catch(e=>{
      console.log(e)
      p.dispatch({type:'loadingOff'})
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


  //코멘트

  //코멘트 멤버배정
  const [commentMember, commentMemberCng] = useState([]);
  const [commentMemberModal, commentMemberModalCng] = useState(false);

  const commentMemberModalClose =useCallback((e)=>{
    if(!e.target.closest('.chargeBtn')){
      commentMemberModalCng(false)
      setTimeout(()=>{
        window.removeEventListener('click', commentMemberModalClose)
      })
    }
  },[])

  useEffect(()=>{
    titleDataCng(p.taskModalData.task_title)
    contentDataCng(p.taskModalData.task_content)
    dateDataCng({
      task_startdate:p.taskModalData.task_startdate,
      task_duedate:p.taskModalData.task_duedate
    })
    labelDataCng(p.taskModalData.label_title)
    statusDataCng(p.taskModalData.task_status)
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

  useEffect(()=>{
    commentMemberCng([]);
  },[tabState])

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
          <Button variant="danger" style={{fontSize:'.8rem'}} onClick={()=>{
            p.dispatch({type:'loadingOn'})
            axios.post('/ajax/deleteProjMember',{
              taskSeq:p.taskModalData.task_seq,
              projmemberSeq:deleteMemberSeq
            })
            .then(r=>{
              taskRefresh();
              alertClose()
            })
            .catch(e=>{
              console.log(e)
              p.dispatch({type:'loadingOff'})

            })
          }}>
            제외
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={deleteTaskAlert} onHide={taskAlertClose} className="modalWrap deleteMemberModal">
        <Modal.Header style={{borderBottom:0}}>
          <Modal.Title className="modalTitle" >정말 업무를 삭제할까요?</Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{borderTop:0}}>
          <Button variant="secondary" onClick={taskAlertClose} style={{fontSize:'.8rem'}}>
            취소
          </Button>
          <Button variant="danger" style={{fontSize:'.8rem'}} onClick={e=>{
            p.dispatch({type:'loadingOn'})
            axios.post(host+'/ajax/deleteTask',{
              taskSeq:p.taskModalData.task_seq,
            })
            .then(r=>{
              p.dispatch({type:'loadingOff'})
              p.dispatch({type:'refreshCng'})
              taskAlertClose()
              p.dispatch({type:'taskModalCng',val:false})
            })
            .catch(e=>{
              p.dispatch({type:'loadingOff'})
              console.log(e)
            })
          }}>
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
                if(e.key === 'Enter'){
                  p.dispatch({type:'loadingOn'})
                  axios.post(host+'/ajax/updateTaskTitle',{
                    taskSeq:p.taskModalData.task_seq,
                    taskTitle:titleData,
                  })
                  .then(r=>{
                    p.dispatch({type:'refreshCng'})
                    p.dispatch({type:'loadingOff'})
                    editTitleCng(false)
                  })
                  .catch(e=>{
                    console.log(e)
                    p.dispatch({type:'loadingOff'})
                  })
                }
              }}
             onKeyDown={e=>{
             if(e.key === 'Escape'){
                 editTitleCng(false)
                 taskRefresh()
               }
             }}
            />
            {
              editTitle
              ?
                <p className="submitBtn labelEditBtn" onClick={()=>{
                  p.dispatch({type:'loadingOn'})
                  axios.post(host+'/ajax/updateTaskTitle',{
                    taskSeq:p.taskModalData.task_seq,
                    taskTitle:titleData,
                  })
                      .then(r=>{
                        p.dispatch({type:'loadingOff'})
                        editTitleCng(false)
                      })
                      .catch(e=>{
                        console.log(e)
                        p.dispatch({type:'loadingOff'})
                      })
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
            <p className="date">{p.taskModalData.task_date}</p>

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
                <div className="conBtn submitBtn toolTipTopBox"
                     onClick={()=>{
                  editContentCng(false)
                  p.dispatch({type:'loadingOn'})
                  axios.post(host+'/ajax/updateTaskCont',{
                    taskSeq:p.taskModalData.task_seq,
                    taskContent:contentData,
                  })
                  .then(r=>{
                    p.dispatch({type:'loadingOff'})
                    editContentCng(false)
                  })
                  .catch(e=>{
                    p.dispatch({type:'loadingOff'})
                    console.log(e)
                  })
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
                  onKeyDown={e=>{
                    if(e.key === 'Escape'){
                      editContentCng(false)
                      taskRefresh()
                    }
                  }}
                ></textarea>
              </div>
              <p className="menuTitle">속성변경</p>
              <div className="statusRow">
                <p className="label">마일스톤</p>

                <Form.Select size="sm" className="mileSelect" onChange={e=>{
                  p.dispatch({type:"loadingOn"})
                  axios.post(host+'/ajax/changeMile',{
                    taskSeq:p.taskModalData.task_seq,
                    mileSeq:e.target.value,
                  })
                  .then(r=>{
                    p.dispatch({type:'loadingOff'})
                  })
                  .catch(e=>{
                    console.log(e)
                    p.dispatch({type:'loadingOff'})
                  })
                }
                }>
                  <option value="0" selected={p.taskModalData.milestone_seq == "0"?true:false}>마일스톤 없음</option>
                  {
                    p.mileStoneList &&
                      p.mileStoneList.map((r, i) =>{
                        return(
                          <option value={r.milestone_seq}
                                  selected={r.milestone_seq==p.taskModalData.milestone_seq?true:false}

                          >{r.milestone_title}</option>

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
                              deleteMemberSeqCng(r.projmember_seq)
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
                            <div className="member" onClick={()=>{
                              let findArr = p.taskModalData.taskMembers.find(rr=> rr.projmember_seq == r.projmember_seq)
                              if(findArr==undefined){
                                p.dispatch({type:'loadingOn'})
                                axios.post(host+'/ajax/addMember',{
                                  taskSeq:p.taskModalData.task_seq,
                                  projmemberSeq:r.projmember_seq
                                })
                                .then(r=>{
                                  taskRefresh();
                                  p.dispatch({type:'loadingOff'})
                                })
                                .catch(e=>{
                                  p.dispatch({type:'loadingOff'})
                                })
                              }
                              
                              
                            }}>
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
                                <p className="email">{r.member_email}</p>
                              </div>
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
                              taskRefresh()
                            })
                            .catch(e=>{
                              console.log(e)
                            })
                          }
                        }}
                       onKeyDown={e=>{
                         if(e.key === 'Escape'){
                           editLabelCng(false)
                           taskRefresh()
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
                            taskRefresh()
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
                <Form.Select size="sm" onChange={e=>{
                  p.dispatch({type:"loadingOn"})
                  axios.post(host+'/ajax/updatePriority',{
                    taskSeq:p.taskModalData.task_seq,
                    priorityCode:e.target.value,
                  })
                  .then(r=>{
                    p.dispatch({type:'loadingOff'})
                  })
                  .catch(e=>{
                    console.log(e)
                    p.dispatch({type:'loadingOff'})
                  })
                }}>
                  <option value="" selected={p.taskModalData.priority_code?false:true}>중요도 없음</option>
                  <option value="10" selected={p.taskModalData.priority_code == "10"?true:false}>긴급</option>
                  <option value="20" selected={p.taskModalData.priority_code == "20"?true:false}>높음</option>
                  <option value="30" selected={p.taskModalData.priority_code == "30"?true:false}>보통</option>
                  <option value="40" selected={p.taskModalData.priority_code == "40"?true:false}>낮음</option>
                  <option value="50" selected={p.taskModalData.priority_code == "50"?true:false}>무시</option>
                </Form.Select>
              </div>
              <div className="statusRow">
                <p className="label">진행여부</p>
                <Form.Check inline label="진행중" type="radio" name="endRadio" id="endRadio1" checked={statusData == "0"?true:false} onClick={()=>{
                  p.dispatch({type:'loadingOn'})
                  axios.post(host+'/ajax/openTask',{
                    taskSeq:p.taskModalData.task_seq
                  })
                  .then(r=>{
                    taskRefresh()
                  })
                }}/>
                <Form.Check inline label="종료" type="radio" name="endRadio" id="endRadio2" checked={statusData == "1"?true:false} onClick={()=>{
                  p.dispatch({type:'loadingOn'})
                  axios.post(host+'/ajax/closeTask',{
                    taskSeq:p.taskModalData.task_seq
                  })
                  .then(r=>{
                    taskRefresh()
                  })
                }}/>
                <Button type="button" className="taskDeleteBtn" onClick={()=>{
                  deleteTaskAlertCng(true)
                }}>업무 삭제하기</Button>
              </div>
            </>
          }

          {
            tabState == 1 &&
            <>
              <div className="commentWrap">
                <div className="commentList">
                  <div className="comment">

                    <div className="data">
                      <div className="textWrap">
                        <div className="writer">
                          <p>작성자</p>
                          <p>2020-12-12</p>
                        </div>
                        <div className="text">안녕하세요 이렇게 텍스트가 들어감 안녕하세요 이렇게 텍스트가 들어감안녕하세요 이렇게 텍스트가 들어감안녕하세요 이렇게 텍스트가 들어감안녕하세요 이렇게 텍스트가 들어감안녕하세요 이렇게 텍스트가 들어감안녕하세요 이렇게 텍스트가 들어감</div>
                      </div>
                      <div className="fileMemberWrap">
                        <div className="member">
                          <p className="person">@사용자1</p>
                          <p className="person">@사용자2</p>
                          <p className="person">@사용자3</p>
                          <p className="person">@사용자3</p>


                        </div>
                        <div className="file">
                          <FileIcon extension="pdf" {...defaultStyles.pdf} />
                          <p className="fileInfo">파일이름입니다 파일이름입니다.pdf</p>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>


                <div className="commentForm">
                  <div className="dataWrap">
                    <div className="file">
                      <input type="file" id="commentFileInput"/>
                      <label htmlFor="commentFileInput" className="commentBtn" style={{color:seqColorTrans(2)}}>
                        <i class="fas fa-file-upload"></i>파일
                      </label>
                      <div className="name toolTipTopBox">
                        <div className="toolTip" style={{marginLeft:'-32px'}}>파일 삭제</div>
                        <p>파일명파일명파일명파일명파일명.jpg</p>
                      </div>
                    </div>
                    <div className="member">
                      <div className="commentBtn chargeBtn" style={{color:seqColorTrans(2)}} onClick={()=>{
                        setTimeout(()=>{
                          commentMemberModalCng(true)
                          window.addEventListener('click', commentMemberModalClose)
                        })
                      }}>
                        <i class="fas fa-users"></i>멤버
                        <div className={"chrgeWrap "+(commentMemberModal?'on':'')}>
                          {
                            p.memberList &&
                            p.memberList.map(r=>{
                              return(
                                <div className="member" onClick={()=>{
                                  let check = commentMember.find(rr=>rr==r.projmember_seq)

                                  if(check==undefined){
                                    commentMemberCng([
                                      ...commentMember,
                                      r.projmember_seq
                                    ])
                                  }
                                  
                                }}>
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
                                    <p className="email">{r.member_email}</p>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>

                      <div className="commentMemberWrap">
                          {
                            commentMember &&
                            commentMember.map(r=>{
                              let member = p.memberList.find(rr=>rr.projmember_seq == r)
                              let name = member.projmember_name?member.projmember_name:'#'+member.projmember_seq
                              
                              return(
                                <p>@{name}</p>
                              )
                            })
                          }
                      </div>
                    </div>
                  </div>
                  <textarea name="" placeholder="코멘트 내용을 입력해주세요." className="commentTextInput" spellCheck={false}></textarea>
                  
                  
                  
                </div>
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
    refresh : state.refresh,
  }
}

export default connect(transReducer)(TaskModal);
