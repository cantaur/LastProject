import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors} from './Helper.js'
import DatePicker from './DatePicker.js'
import HeadSide from './HeadSide.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';


function ProjectList(p){

  return(
    <div className="viewOutWrap">
      <HeadSide/>
    </div>
  )
}


function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(ProjectList);