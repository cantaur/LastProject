import axios from "axios";
import React, { useEffect, useRef, useState } from "react"
import DatePicker from '../../DatePicker.js'

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

  // 제목 설명 더미
  const [infoDummy, infoDummyCng] =useState();


  useEffect(()=>{
    // p.mileStoneInfoCng(info)
    infoDummyCng(p.mileStoneInfo)
  },[])
  return(
    <>
    {  
      p.isView &&
      <div className="stoneListbtnWrap">
        <i class="far fa-check-circle toolTipTopBox"> 완료처리
        </i>
        <i class="far fa-trash-alt toolTipTopBox delete"> 삭제
        </i>
      </div>
    }
    {
      p.mileStoneInfo
      ?
        <div className={"stoneList " + (p.isView?'view ':'') + (p.isComplete?'completed ':'')} style={{backgroundColor:p.color+'20'}}>
        
        <p className="titleWrap">
          <p className={"title " + (p.isView?'view':'')}  onClick={()=>{
            if(!p.isView){
              history.push("/project/"+p.prjSeq+"/mileStoneView/"+p.milestone_seq)
              p.dispatch({type:'pagePush', val:'mileStoneView'})
            }
          }}>
            <p class="tit">
              {
                titleModify
                ? 
                  <input type="text" className="titModify" ref={titModify} value={infoDummy.milestone_title} placeholder="마일스톤 제목을 입력하세요." spellcheck="false" 
                  onChange={(e)=>{
                    infoDummyCng({
                      ...infoDummy,
                      milestone_title:e.target.value
                    })
                    console.log(infoDummy)
                  }}
                  onKeyPress={e=>{
                    if(e.key === "Enter"){
                      p.mileStoneInfoCng({
                        ...p.mileStoneInfo,
                        milestone_title:infoDummy.milestone_title
                      })
                      p.mileStoneUpdate(p.mileStoneInfo)
                      titleModifyCng(false)
                    }
                  }
                  }/>
                :p.milestone_title
              }
            </p>
            {
              p.isView
              ?
                titleModify
                ?
                <>
                  <i class="fas fa-check updateBtn" onClick={()=>{
                    p.mileStoneInfoCng({
                      ...p.mileStoneInfo,
                      milestone_title:infoDummy.milestone_title
                    })
                    console.log(p.mileStoneInfo)
                    console.log('zxzz')
                    p.mileStoneUpdate(p.mileStoneInfo)
                    titleModifyCng(false)

                  }}></i>
                  <i class="fas fa-times updateBtn" onClick={()=>{
                    infoDummyCng({
                      milestone_title:p.mileStoneInfo.milestone_title
                    })
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
                ? <input type="text" className="subModify" ref={subModifyRef} value={p.mileStoneInfo.milestone_content} placeholder="마일스톤 설명을 입력하세요." spellcheck="false" onChange={(e)=>{
                  p.mileStoneInfoCng({
                    ...p.mileStoneInfo,
                    milestone_content:e.target.value
                  })
                }}/>
                :
                  p.milestone_content
                  ?
                  p.milestone_content
                  : '마일스톤 설명이 없습니다.'
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
              p.milestone_startdate
              ? <div className="date on" onClick={()=>{
                  p.dispatch({type:'modalOn'})
                  setTimeout(()=>{
                    window.addEventListener('click', p.dateModalClose)
                  })
                }}>
                  <i class="far fa-clock"></i>
                  {p.mileStoneInfo.milestone_startdate} ~ {p.mileStoneInfo.milestone_duedate}
                  <div className="datePickerWrap">
                    <DatePicker
                      pickerDateCng={p.mileStoneInfoCng}
                      pickerDate={p.mileStoneInfo}
                      pickerStartKey={'milestone_startdate'}
                      pickerEndKey={'milestone_duedate'}
                      completeKey={true}
                      dateModalClose={p.dateModalClose}
                      dateUpdate={p.mileStoneUpdate}
                    />
                  </div>
                </div>
              : <div className="date on" onClick={()=>{
                  p.dispatch({type:'modalOn'})
                  setTimeout(()=>{
                    window.addEventListener('click', p.dateModalClose)
                  })
                }}>
                  <i class="far fa-clock"></i>
                  마일스톤 일정 추가하기
                  <div className="datePickerWrap">
                    <DatePicker
                      pickerDateCng={p.mileStoneInfoCng}
                      pickerDate={p.mileStoneInfo}
                      pickerStartKey={'milestone_startdate'}
                      pickerEndKey={'milestone_duedate'}
                      completeKey={true}
                      dateModalClose={p.dateModalClose}
                      dateUpdate={p.mileStoneUpdate}
                    />
                  </div>
                </div>
            :
              p.milestone_startdate  
              ?
              <div className="date">
                <i class="far fa-clock"></i>
                {p.milestone_startdate} ~ {p.milestone_duedate}
              </div>
              : null
          }
          
          <div className="progressBar toolTipTopBox">
            <div className="toolTip" style={{marginLeft:'0px', left:'0%'}}>
              전체 업무 : {p.taskCnt}, 완료된 업무 : {p.completeTaskCnt}, 완료율 : {Math.round((p.completeTaskCnt/p.taskCnt)*100)}%
            </div>
            <div className="bar" style={{backgroundColor:p.color,width:Math.round((p.completeTaskCnt/p.taskCnt)*100)+'%'}}></div>
          </div>
        </div>      
      </div>
      : null
    }

    </>
    
    
  )
}


function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(StoneList);