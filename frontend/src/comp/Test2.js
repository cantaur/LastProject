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


const pColorB = {
  backgroundColor: '#038D7F',
}

const pColor = {
color: '#038D7F',
}

function Test2(p){

  return(
    <div className="viewOutWrap" style={{overflow:"scroll"}}>
      <HeadSide/>
      <div style={{padding:"80px"}}>
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
        />
      </div>
    </div>
  )
}



function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(Test2);