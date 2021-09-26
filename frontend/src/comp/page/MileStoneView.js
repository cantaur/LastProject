import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors, pages, seqColorTrans} from '../Helper.js'
import DatePicker from '../DatePicker.js'
import StoneList from "./comp/StoneList.js";

import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import NonePage from "../NonePage.js";



function MileStoneView(p){
  
  useEffect(()=>{
    // console.log(p.prjColor)
  },[])
  

  return(
    <div className="pageContentWrap mileStoneWrap">
      

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
          isView={true}
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

export default connect(transReducer)(MileStoneView);