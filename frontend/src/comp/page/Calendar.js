import axios from "axios";
import React, { useEffect, useState,useRef,useCallback } from "react"
import {pub, colors, pages, host} from '../Helper.js'
import DatePicker from '../DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import { registerLocale } from "react-datepicker";


import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';



function Calendar(p){
  const history = useHistory();


  //캘린더에 표시할 일정 정보
  const [memoList,memoListCng] = useState();

  //캘린더에 표시할 일정 정보 불러옴
  const memoListGetFunc = () => {
    axios.get(host+'/ajax/calList/'+p.projectInfo.project_seq)
    .then(r=>{
      let taskList = r.data[0].taskListProj
      let calendarList = r.data[0].calListProj
      let memoListDummy = [];
      taskList.forEach(r=>{
        if(r.task_startdate){
          memoListDummy.push(
            {
              title : r.task_title,
              description: r.task_content,
              start : r.task_startdate,
              end : r.task_duedate,
              classNames:'task',
              editable:false,
            },
          )
        }
      })

      calendarList.forEach(r=>{
        memoListDummy.push(
          {
            title : r.calendar_title,
            description: r.calendar_content,
            start : r.calendar_startdate,
            end : r.calendar_enddate,
            backgroundColor:"#273646",
            
          },
        )
      })
      memoListCng(memoListDummy)
      p.dispatch({type:'loadingOff'})
    })
    .catch(e=>{
      console.log(e)
      p.dispatch({type:'loadingOff'})
    })
  }

  //메모등록 정보
  const [createData, createDataCng] = useState({
    calendar_title:'',
    calendar_content:'',
    calendar_startdate:'',
    calendar_enddate:'',
    projmember_seq:'',
    project_seq:'',
  });

  //메모등록 모달 컨트롤
  const [createModal, createModalCng] = useState(false)

  //메모등록시 내부 알림창
  const [alert,alertCng] = useState(false);
  const [dateAlert,dateAlertCng] = useState(false);


  //메모 등록, 수정 날짜선택 이중모달 컨트롤
  let dateModalClose =useCallback((e)=>{
    if(!e.target.closest('.DayPicker_1') ){
      p.dispatch({type:'modalOff'})
      setTimeout(()=>{
        window.removeEventListener('click', dateModalClose)
      })
    }
  },[])

  useEffect(()=>{
    p.dispatch({type:'loadingOn'})
    memoListGetFunc();    
  },[p.projectInfo, p.pageInfo])

  return(
    <div className="calendarWrap pageContentWrap">
      <div className="pageBtnWrap">
        <p className="pageBtn on" style={{color:p.prjColor,borderColor:p.prjColor}} onClick={()=>{
          p.dispatch({type:'pagePush', val:'todo'})
          history.push('/project/'+p.prjSeq+'/todo')
        }}>캘린더</p>
        <p className="pageBtn" onClick={()=>{
          p.dispatch({type:'pagePush', val:'notice'})
          history.push('/project/'+p.prjSeq+'/notice')
        }}>타임라인</p>
        <p className="pageBtn" onClick={()=>{
          p.dispatch({type:'pagePush', val:'notice'})
          history.push('/project/'+p.prjSeq+'/notice')
        }}>프로젝트개요</p>
        <p className="pageBtn" onClick={()=>{
          p.dispatch({type:'pagePush', val:'notice'})
          history.push('/project/'+p.prjSeq+'/notice')
        }}>파일보관함</p>
      </div>

      <CreateDateModal
        show={createModal}
        onHide={() => {
          createModalCng(false)
          alertCng(false)
          dateAlertCng(false)
          createDataCng({
            calendar_title:'',
            calendar_content:'',
            calendar_startdate:'',
            calendar_enddate:'',
            projmember_seq:'',
            project_seq:'',
          })
        }}
        alert={alert}
        alertCng={alertCng}
        dateAlertCng={dateAlertCng}
        createModalCng={createModalCng}
        prjColor={p.prjColor}
        dispatch={p.dispatch}
        dateModalClose={dateModalClose}
        createData={createData}
        createDataCng={createDataCng}
        memoListGetFunc={memoListGetFunc}
      />
      <div className="calendarCon">
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin ]}
          initialView="dayGridMonth"
          dateClick={e=>{
            createModalCng(true);
            createDataCng({
              calendar_title:'',
              calendar_content:'',
              calendar_startdate:e.dayEl.dataset.date,
              calendar_enddate:e.dayEl.dataset.date,
              projmember_seq : p.myMemberInfo.projmember_seq,
              project_seq:p.projectInfo.project_seq
            })
          }}
          weekends={true}
          headerToolbar={{
              start: 'title',
              center: '',
              end: 'today,prev,next'
          }}
          windowResizeDelay={0}
          contentHeight="auto"
          height="auto"
          editable={true}
          selectable={true}
          dayMaxEvents={3}
          locale='ko'
          events={memoList}
          eventColor={p.prjColor}


          eventClick={e=>{
            console.log(e)
          }}

          eventDrop={e=>{
            console.log(e)
          }}
          eventResize={e=>{
            console.log(e)
          }}
        />
      </div>

    </div>
  )
}

function CreateDateModal(p) {
  return (
    <Modal
      {...p}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modalWrap"
      style={{marginTop:'-70px'}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="modalTitle">
          캘린더 메모 만들기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          p.alert
          ?
          <Alert variant={'danger'} style={{fontSize:'.8rem',marginBottom:'.4rem'}}>메모 제목을 입력해주세요. &#x1F602;</Alert>
          : null
        }
        {
          p.dateAlert
          ?
          <Alert variant={'danger'} style={{fontSize:'.8rem',marginBottom:'.4rem'}}>날짜를 지정해주세요. &#x1F602;</Alert>
          : null
        }
        
        <Form.Group className="mb-2 piumInput" controlId="floatingInput">
          <FloatingLabel
            controlId="floatingInput"
            label="메모 제목"
          >
            <Form.Control type="text" placeholder="메모 제목" name="project_title" spellCheck="false" onChange={e=>{
              p.createDataCng({
                ...p.createData,
                calendar_title:e.target.value
              })
            }}/>
          </FloatingLabel>
        </Form.Group>
        

        <Form.Group className=" piumInput" controlId="floatingTextarea">
          <FloatingLabel controlId="floatingTextarea" label="내용">
            <Form.Control type="textarea" placeholder="내용" name="project_content" spellCheck="false" onChange={e=>{
              p.createDataCng({
                ...p.createData,
                calendar_content:e.target.value
              })
            }}/>
          </FloatingLabel>
        </Form.Group>

        <div className="datePickerWrap">
          <DatePicker
            pickerStartDate={p.createData.calendar_startdate}
            pickerEndDate={p.createData.calendar_enddate}
            pickerDateCng={p.createDataCng}
            pickerDate={p.createData}
            pickerStartKey={'calendar_startdate'}
            pickerEndKey={'calendar_enddate'}
            dateModalClose={p.dateModalClose}
          />
          <p className="dateBtn" onClick={
            ()=>{
              p.dispatch({type:'modalOn'})
              setTimeout(()=>{
                window.addEventListener('click', p.dateModalClose)
              })
            }
          }>
            <i class="far fa-calendar-check"></i> 일정선택
          </p>
          <p className="dateInfo">
            {p.createData.calendar_startdate?(p.createData.calendar_startdate + " ~ "):''}
            
            {p.createData.calendar_enddate?p.createData.calendar_enddate:''}

          </p>
        </div>
        
      </Modal.Body>
      <Modal.Footer className="modalBtnWrap">
        <Button className="modalBtn" onClick={()=>{
          if(!p.createData.calendar_title){
            p.alertCng(true)
            p.dateAlertCng(false)
          }else if(!p.createData.calendar_startdate){
            p.dateAlertCng(true)
            p.alertCng(false)
          }else {
            let data = p.createData.calendar_enddate?p.createData:{
              ...p.createData,
              calendar_enddate : p.createData.calendar_startdate
            }
            p.dispatch({type:'loadingOn'})

            console.log(data)
            axios.post(host+'/ajax/createCal',data)
            .then(r=>{
              p.createModalCng(false)
              p.alertCng(false)
              p.dateAlertCng(false)
              p.createDataCng({
                calendar_title:'',
                calendar_content:'',
                calendar_startdate:'',
                calendar_enddate:'',
                projmember_seq:'',
                project_seq:'',
              })
              p.memoListGetFunc();
            })
            .catch(e=>{
              console.log(e)
              p.dispatch({type:'loadingOff'})
            })
          }
        }}>만들기</Button>

        

      </Modal.Footer>
    </Modal>
  );
}


function transReducer(state){
  return {
    loading : state.loading,
    datePickerModal : state.datePickerModal,
    projectInfo : state.projectInfo,
    pageInfo : state.pageInfo,
    myMemberInfo : state.myMemberInfo,
  }
}

export default connect(transReducer)(Calendar);