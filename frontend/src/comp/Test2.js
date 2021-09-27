import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors} from './Helper.js'
import DatePicker from './DatePicker.js'
import HeadSide from './HeadSide.js'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {Modal, Button} from 'react-bootstrap';


const pColorB = {
  backgroundColor: '#038D7F',
}

const pColor = {
color: '#038D7F',
}

function Test2(p){
    const eventColor = {
        color: '#038D7F1F'
    }
    const [modalShow, setModalShow] = useState(false);

    const events = [
        {
            id: 1,
            title: 'event 1',
            start: '2021-09-20',
            end: '2021-09-20',
        },
        {
            id: 2,
            title: 'event 4',
            start: '2021-09-28',
            end: '2021-09-30',
        },
        {
            id: 4,
            title: '사과먹기',
            start: '2021-09-28',
            allDay: 'true'
        },
        {
            id: 5,
            title: '학원가는날',
            allDay: 'true',
            start: '2021-09-26',
            extendedProps: {
                department: 'BioChemistry'
            },
            description: 'Lecture'
        }


    ]
  return(
    <div className="viewOutWrap">
        <CreateDateModal modalShow={modalShow} setModalShow={setModalShow} />
      <HeadSide/>
      <div style={{padding:"80px"}}>

        <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin ]}
            initialView="dayGridMonth" //초기 달력모양 설정값
            eventContent= {renderEventContent } // 이벤트 내용
            dateClick={()=>setModalShow(true)} // 데이트를 클릭 시 이벤트 발생o
            eventClick={content}
            weekends={true} //주말 보이게하려면 = true
            headerToolbar={{        //캘린더 헤더툴바 내용
                start: '',
                center: 'title',
                end: 'today,prev,next'
            }}
            windowResizeDelay={0}   //캘린더 크기조정시 딜레이 시간
            contentHeight="auto"    //캘린더 내용 크기 = 자동
            height="auto"           //캘린더 크기 = 자동
            editable={true}
            selectable={true}
            dayMaxEvents={2}
            locale='ko' //한국어로 설정
            events={events} //이벤트 객체 설정
            eventColor='eventColor'//이벤트 색상
            // themeSystem={'bootstrap'}
        />

      </div>
    </div>
  )
    function content(info){
       alert(
           "Title ID : "+info.event.titleId+"\n"+
           "Title : "+info.event.title+"\n"+
           "StartDate : "+info.event.start+"\n"+
           "EndDate : "+info.event.end+"\n"+
           "Description : "+info.event.extendedProps.description

       )
    }
    function CreateDateModal(props){
        const modalShow=props.modalShow
        const setModalShow=props.setModalShow

        return(
            <Modal
                key="fade"
                animation="true"         show={modalShow}
                onHide={() => setModalShow(false)}
                dialogClassName={"modal-90w"}
                aria-labelledby={"createDateModal"}
            >
            <Modal.Header closeButton>
                <Modal.Title id="createDateModal">
                    일정 생성
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"secondary"} onClick={()=>setModalShow(false)}>
                    닫기
                </Button>
                        
            </Modal.Footer>
            </Modal>
        )
    }
    function handleDateClick (arg){
        alert("선택한 날짜는 "+ arg.dateStr + " 입니다.")
    }
    function renderEventContent(eventInfo) {
        return (
            <div>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </div>
        )
    }
}

function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(Test2);
