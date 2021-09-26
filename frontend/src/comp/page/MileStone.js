import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors, pages, seqColorTrans} from '../Helper.js'
import StoneList from "./comp/StoneList.js";
import DatePicker from '../DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import NonePage from "../NonePage.js";



function MileStone(p){

  const history = useHistory();
  useEffect(()=>{
    // console.log(history)
  },[])

  return(
    <div className="pageContentWrap mileStoneWrap">

      <div className="header">
        <p className="title">&#x1F6A9; 마일스톤</p>
        <div className="toolTipTopBox">
          <p className="createBtn" style={{backgroundColor:p.prjColor}}>+ 마일스톤 만들기</p>
        </div>
      </div>

      <div className="stoneListWrap">
        <StoneList 
          prjSeq={p.prjSeq}
          seq={2}
          title={'마일스톤 제목'}
          sub={'마일스톤 설명'}
          color={seqColorTrans(2)} 
          
          completeTaskCnt={1}
          taskCnt={2}
          dispatch={p.dispatch}
          // stDate={'2020-11-11'}
          // edDate={'2020-12-22'}
        />

        <StoneList 
          prjSeq={p.prjSeq}
          seq={1}
          title={'마일스톤 제목'}
          sub={'마일스톤 설명'}
          color={seqColorTrans(1)} 
          completeTaskCnt={12}
          taskCnt={33}
          dispatch={p.dispatch}
          stDate={'2020-11-11'}
          edDate={'2020-12-22'}
        />
        <StoneList 
          prjSeq={p.prjSeq}
          seq={4}
          title={'마일스톤 제목'}
          sub={'마일스톤 설명'}
          color={seqColorTrans(4)} 
          completeTaskCnt={9}
          taskCnt={10}
          dispatch={p.dispatch}
          stDate={'2020-11-11'}
          edDate={'2020-12-22'}
        />

        <StoneList 
          prjSeq={p.prjSeq}
          seq={3}
          title={'마일스톤 제목'}
          sub={'마일스톤 설명'}
          color={seqColorTrans(3)} 
          completeTaskCnt={1}
          taskCnt={4}
          dispatch={p.dispatch}
          stDate={'2020-11-11'}
          edDate={'2020-12-22'}
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

export default connect(transReducer)(MileStone);