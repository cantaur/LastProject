import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors} from './Helper.js'
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
import {Modal, Button, Form, FloatingLabel} from 'react-bootstrap';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';

const pColorB = {
  backgroundColor: '#038D7F',
}

const pColor = {
color: '#038D7F',
}


function Test2(p){
    const calendarInfo = useState({
        calendar_seq:'',
        calendar_title:'',
        calendar_content:'',
        calendar_startdate:'',
        calendar_date:''
    });
    const {calendar_title, calendar_content, calendar_startdate, calendar_date} = calendarInfo;
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
    const [modalShow, setModalShow] = useState(false);
  return(
    <div className="viewOutWrap">
        <CreateDateModal
            modalShow={modalShow}
            setModalShow={setModalShow}
        />
      <HeadSide/>
      <div style={{padding:"80px"}}>

        <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin ]}
            initialView="dayGridMonth" //초기 달력모양 설정값
            eventContent= {renderEventContent } // 이벤트 내용
            dateClick={()=>setModalShow(true)} // 데이트를 클릭 시 이벤트 발생 o
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
            eventColor='#038D7F'//이벤트 색상
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

    function CreateDateModal(p){
        return(
            <Modal
                key="fade"
                animation="true"
                show={modalShow}
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
                <Form.Group className="mb-2 piumInput" controlId="floatingInput">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="일정 제목"
                    >
                        <Form.Control type="text" placeholder="일정 제목" name="project_title" value={p.calendar_title} spellCheck="false" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="piumInput" controlId="floatingTextarea">
                    <FloatingLabel controlId="floatingTextarea" label="설명">
                        <Form.Control type="textarea" placeholder="설명" name="project_content" value={p.calendar_content} spellCheck="false" />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="form-floating">
                    <p className="schedule-div">
                        <i className="far fa-calendar-check"></i> 스케줄  <SelectDate/>
                    </p>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-primary"} onClick={()=>setModalShow(false)}>
                    확인
                </Button>
                <Button variant={"secondary"} onClick={()=>setModalShow(false)}>
                    닫기
                </Button>

            </Modal.Footer>
            </Modal>
        )
    }
    function renderEventContent(eventInfo) {
        return (
            <div>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </div>
        )
    }

    function SelectDate(p){ //날짜선택창
        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);
        registerLocale("ko", ko);
        return (
            <div>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                timeInputLabel="시간 :"
                showTimeInput
                startDate={startDate}
                endDate={endDate}
                isClearable={startDate==''? false:true} //날짜 선택 시 x(초기화) 버튼 생성
                dateFormat="yyyy년 MM월 dd일 h:mm aa"
                placeholderText="시작일"
                selectsStart
                className="startDate-input"
                locale="ko"
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                timeInputLabel="시간 :"
                showTimeInput
                startDate={startDate}
                endDate={endDate}
                isClearable={endDate==""? false:true} //날짜 선택 시 x(초기화) 버튼 생성
                dateFormat="yyyy년 MM월 dd일 h:mm aa"
                placeholderText="종료일"
                selectsEnd
                minDate={startDate} //과거 날짜는 선택 불가
                className="endDate-input"
                locale="ko"
            />
            </div>
        );
    }
}

function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(Test2);
