import axios from "axios";
import React, { useEffect, useRef, useState } from "react"
import DatePicker from '../../DatePicker.js'

import {pub, host, colors, pages, seqColorTrans} from '../../Helper.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';



function ChartHead(p){
  return(
    <>
      <p>상단</p>

    </>
    
    
  )
}


function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
    isMaster:state.isMaster,
  }
}

export default connect(transReducer)(ChartHead);