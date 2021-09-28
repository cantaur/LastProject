import axios from "axios";
import React, { useEffect, useState,useCallback } from "react"
import {pub, colors, pages, seqColorTrans} from '../Helper.js'
import DatePicker from '../DatePicker.js'
import StoneList from "./comp/StoneList.js";

import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import NonePage from "../NonePage.js";



function MileStoneView(p){
  const params = useParams();
  const mileStoneSeq = params.pageSeq;

  //마일스톤 수정하기 정보
  const [mileStoneInfo, mileStoneInfoCng] = useState({
    milestone_seq:'',
    milestone_title:'',
    milestone_content:'',
    milestone_startdate:'',
    milestone_duedate:''
  });

  let dateModalClose =useCallback((e)=>{
    if(!e.target.closest('.DayPicker_1') ){
      p.dispatch({type:'modalOff'})
      setTimeout(()=>{
        window.removeEventListener('click', dateModalClose)
      })
    }
  },[])
  
  useEffect(()=>{
    // p.dispatch({type:'modalOn'})
  },[])
  

  return(
    <div className="pageContentWrap mileStoneWrap">
      

      <div className="stoneListWrap">
        <StoneList 
          prjSeq={p.prjSeq}
          milestone_seq={1}
          milestone_title={'마일스톤 제목'}
          milestone_content={''}
          color={seqColorTrans(2)} 
          
          completeTaskCnt={1}
          taskCnt={2}
          milestone_startdate={''}
          milestone_duedate={''}
          isView={true}
          dateModalClose={dateModalClose}
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