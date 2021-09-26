import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors, pages, seqColorTrans} from './Helper.js'
import DatePicker from './DatePicker.js'
import HeadSide from './HeadSide.js'
import Todo from './page/Todo.js'
import Calender from './page/Calender.js'
import MileStone from './page/MileStone.js'
import MileStoneView from './page/MileStoneView.js'
import Task from './page/Task.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';



function ProjectList(p){
  const history = useHistory();
  const params = useParams();
  const page = params.page;
  const seq = params.seq;

  const prjColor = seqColorTrans(seq);


  useEffect(()=>{
    const isPage = pages.find(e=> e === page)
    if(isPage == undefined){
      history.push('/404')
    } else {
      p.dispatch({type:"pagePush", val:isPage})
    }
  },[])
  


  return(
    <div className="viewOutWrap">
      <HeadSide prjColor={prjColor} prjSeq={seq}/>
      <div className="viewInnerWrap">
        {
          p.pageInfo == 'todo' &&
          <Todo prjColor={prjColor} prjSeq={seq}/>
        }
        {
          p.pageInfo == 'calender' &&
          <Calender prjColor={prjColor} prjSeq={seq}/>
        }
        {
          p.pageInfo == 'mileStone' &&
          <MileStone prjColor={prjColor} prjSeq={seq}/>
        }
        {
          p.pageInfo == 'mileStoneView' &&
          <MileStoneView prjColor={prjColor} prjSeq={seq}/>
        }
        {
          p.pageInfo == 'task' &&
          <Task prjColor={prjColor} prjSeq={seq}/>
        }
      </div>
    </div>
  )
}


function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
    pageInfo : state.pageInfo
  }
}

export default connect(transReducer)(ProjectList);