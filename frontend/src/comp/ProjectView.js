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


  //프로젝트리스트 (셀렉트)
  const [prjList, prjListCng] = useState();

  //현재 프로젝트 제목, 상태
  const [prjInfo, prjInfoCng] = useState();


  useEffect(()=>{
    const isPage = pages.find(e=> e === page)
    if(isPage == undefined){
      history.push('/404')
    } else {
      p.dispatch({type:"pagePush", val:isPage})
    }


    //프로젝트 정보 가져옴
    // axios.get(host+'/ajax/myproject')
    // .then(r=>{
    //   prjListCng(r.data);
    //   p.dispatch({type:'loadingOff'})
    // })
    // .catch(e=>{
    //   console.log(e)
    //   p.dispatch({type:'loadingOff'})
    // })

    //프론트 작업용샘플
    prjListCng([
      {
        member_seq: 4,
        project_content: "내용입니다아1",
        project_duedate: "2021-11-25",
        project_enddate: "",
        project_isdelete: 0,
        project_seq: 1,
        project_startdate: "2021-09-25",
        project_status: 1,
        project_title: "진행중프로젝트1",
        projmember_type: 0
      },
      {
        member_seq: 4,
        project_content: "내용입니다아2",
        project_duedate: "2022-11-25",
        project_enddate: "",
        project_isdelete: "0",
        project_seq: 4,
        project_startdate: "2021-09-25",
        project_status: 0,
        project_title: "진행중프로젝트2",
        projmember_type: 0
      },
    ])

    
  },[])
  


  return(
    <div className="viewOutWrap">
      <HeadSide prjColor={prjColor} prjSeq={seq} prjList={prjList} prjInfo={prjInfo}/>
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