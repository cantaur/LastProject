import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors, pages, host} from '../Helper.js'
import DatePicker from '../DatePicker.js'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import {Badge, Button, FloatingLabel, Form, Modal, Nav} from 'react-bootstrap';
import {Menu, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';



function Notice(p){
  const history = useHistory();
  return(
    <>
    <div className="pageContentWrap">
      <div className="pageBtnWrap">
        <p className="pageBtn" onClick={()=>{
          p.dispatch({type:'pagePush', val:'todo'})

          history.push('/project/'+p.prjSeq+'/todo')
        }}>To do List</p>
        <p className="pageBtn on" style={{color:p.prjColor,borderColor:p.prjColor}} onClick={()=>{
          p.dispatch({type:'pagePush', val:'notice'})
          history.push('/project/'+p.prjSeq+'/notice')
        }}>알림</p>
      </div>
        
      
    </div>
      
    </>  
  )
}



function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(Notice)