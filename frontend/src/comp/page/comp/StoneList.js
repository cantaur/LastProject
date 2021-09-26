import axios from "axios";
import React, { useEffect, useRef, useState } from "react"

import {pub, host, colors, pages, seqColorTrans} from '../../Helper.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';



function StoneList(p){
  const history = useHistory();

  const titModify = useRef();
  const subModifyRef = useRef();

  
  //제목 수정 상태
  const [titleModify, titleModifyCng] = useState(false);

  //설명 수정 상태
  const [subModify, subModifyCng] = useState(false);

  //제목, 설명
  const [info, infoCng] = useState({
    title:p.title,
    sub:p.sub,
    stDate:p.stDate,
    edDate:p.edDate
  })

  //제목, 설명 수정 더미
  const [infoDummy, infoDummyCng] =useState({
    title:p.title,
    sub:p.sub,
    stDate:p.stDate,
    edDate:p.edDate
  })



  useEffect(()=>{
    infoDummyCng(info)
  },[])
  return(
    <>
    {  
      p.isView &&
      <div className="stoneListbtnWrap">
        <i class="fas fa-check toolTipTopBox"> 완료처리
        </i>
        <i class="far fa-trash-alt toolTipTopBox delete"> 삭제
        </i>
      </div>
    }
    <div className={"stoneList " + (p.isView?'view':'')} style={{backgroundColor:p.color+'20'}}>
      
      <p className="titleWrap">
        <p className={"title " + (p.isView?'view':'')}  onClick={()=>{
          history.push("/project/"+p.prjSeq+"/mileStoneView/"+p.seq)
          p.dispatch({type:'pagePush', val:'mileStoneView'})
        }}>
          <p class="tit">
            {
              titleModify
              ? <input type="text" className="titModify" ref={titModify} value={infoDummy.title} placeholder="마일스톤 제목을 입력하세요." spellcheck="false" onChange={(e)=>{
                infoDummyCng({
                  ...infoDummy,
                  title:e.target.value
                })
              }}/>
              :infoDummy.title
            }
          </p>
          {
            p.isView
            ?
              titleModify
              ?
              <>
                <i class="fas fa-check updateBtn" onClick={()=>{
                  
                  titleModifyCng(false)
                }}></i>
                <i class="fas fa-times updateBtn" onClick={()=>{
                  titleModifyCng(false)
                }}></i>
              </>
              :
              <i class="fas fa-pen updateBtn" onClick={()=>{
                titleModifyCng(true)
                setTimeout(()=>{
                  titModify.current.focus();
                },200)
              }}></i>
            :null
            
          }
        </p>
        <p className="subWrap">
          <p className="sub">
            {
              subModify
              ? <input type="text" className="subModify" ref={subModifyRef} value={infoDummy.sub} placeholder="마일스톤 설명을 입력하세요." spellcheck="false" onChange={(e)=>{
                infoDummyCng({
                  ...infoDummy,
                  sub:e.target.value
                })
              }}/>
              :infoDummy.sub
            }
          </p>
          {
            p.isView 
            ?
              subModify
              ?
              <>
                <i class="fas fa-check updateBtn" onClick={()=>{
                  
                  subModifyCng(false)
                }}></i>
                <i class="fas fa-times updateBtn" onClick={()=>{
                  subModifyCng(false)
                }}></i>
              </>
              :
              <i class="fas fa-pen updateBtn" onClick={()=>{
                subModifyCng(true)
                setTimeout(()=>{
                  subModifyRef.current.focus();

                },200)
              }}></i>
            : null
          }
        </p>
      </p>
      
      <div className="infoWrap">
        {
          p.isView
          ?
            p.stDate
            ? <div className="date on">
                <i class="far fa-clock"></i>
                {infoDummy.stDate} ~ {infoDummy.edDate}
              </div>
            : <div className="date on"><i class="far fa-clock"></i> 마일스톤 일정 추가하기</div>
          :
            p.stDate  
            ?
            <div className="date on">
              <i class="far fa-clock"></i>
              {p.stDate} ~ {p.edDate}
            </div>
            : null
        }
        
        <div className="progressBar toolTipTopBox">
          <div className="toolTip" style={{marginLeft:'-200px', left:'100%'}}>
            전체 업무 : {p.taskCnt}, 완료된 업무 : {p.completeTaskCnt}, 완료율 : {Math.round((p.completeTaskCnt/p.taskCnt)*100)}%
          </div>
          <div className="bar" style={{backgroundColor:p.color,width:Math.round((p.completeTaskCnt/p.taskCnt)*100)+'%'}}></div>
        </div>
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

export default connect(transReducer)(StoneList);