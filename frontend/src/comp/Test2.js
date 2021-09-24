import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors} from './Helper.js'
import DatePicker from './DatePicker.js'
import HeadSide from './HeadSide.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const pColorB = {
  backgroundColor: '#038D7F',
}

const pColor = {
color: '#038D7F',
}

function Test2(p){
    const events = [
        {
            id: 1,
            title: 'event 1',
            start: '2021-09-20',
            end: '2021-09-20',
        },
        {
            id: 2,
            title: 'event 2',
            start: '2021-09-28',
            end: '2021-09-30',
        },
        {
            id: 3,
            title: 'event 5',
            start: '2021-09-28',
            end: '2021-09-30',
        },
        {
            id: 4,
            title: '사과먹기',
            start: '2021-09-28'
        },
        {
            id: 5,
            title: 'event 1',
            date: '2021-09-21'
        },
        {
            id: 6,
            title: 'event 2',
            date: '2021-09-22'
        }
    ]
  return(
    <div className="viewOutWrap">
      <HeadSide/>
      <div style={{padding:"80px"}}>
        <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth" //초기 달력모양 설정값
            eventContent= {renderEventContent} // 이벤트 내용
            dateClick={handleDateClick} // 데이트를 클릭 시 이벤트 발생
            weekends={true} //주말 보이게하려면 = true
            headerToolbar={{        //캘린더 헤더툴바 내용
                start: '',
                center: 'title',
                end: 'today,prev,next'
            }}
            windowResizeDelay={0}   //캘린더 크기조정시 딜레이 시간
            contentHeight="auto"    //캘린더 내용 크기 = 자동
            height="auto"           //캘린더 크기 = 자동
            // editable={true}
            // selectable={true}
            dayMaxEvents={true}
            locale='ko' //한국어로 설정
            events={events} //이벤트 객체 설정
        />
      </div>
    </div>
  )
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
