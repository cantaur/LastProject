import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors, pages} from '../Helper.js'
import DatePicker from '../DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';



function Calender(p){
  
  useEffect(()=>{
    
  },[])

  return(
    <>
      <p>캘린더 페이지 입니다</p>
    </>
  )
}


function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(Calender);