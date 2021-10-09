import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors, pages,seqColorTrans} from '../Helper.js'
import DatePicker from '../DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';



function Task(p){
  
  useEffect(()=>{
    
  },[])

  return(
    <div className="pageContentWrap taskWrap">
      <div className="header">
        <p className="title">&#x1F4BC; 업무</p>
        {
          p.projectInfo.project_status != "1"
          ?
          <>
            <div className="toolTipTopBox">
              <p className="createBtn" style={{backgroundColor:p.prjColor}} onClick={()=>{
                
              }}>+ 업무 만들기</p>
            </div>
          </>
          :null
        }
      </div>
      <div className="taskConWrap">
        <div className="taskFilter">
          <p className="title">업무 필터</p>
        </div>
        <div className="taskListWrap">
          <div className="taskHeader">
            <div className="filter">
              <p>전체</p>
              <p>진행중</p>
              <p>종료</p>
              {/* <p style={
                taskFilter == '전체'?
                {backgroundColor:p.prjColor,color:'#fff'}
                :{color:p.prjColor}
                } onClick={()=>{
                  taskFilterFunc('전체')
                  
                }}>전체</p>
              <p style={
                taskFilter == '진행중'?
                {backgroundColor:p.prjColor,color:'#fff'}
                :{color:p.prjColor}
              } onClick={()=>{
                taskFilterFunc('진행중')
              }}>진행중</p>
              <p style={
                taskFilter == '종료'?
                {backgroundColor:p.prjColor,color:'#fff'}
                :{color:p.prjColor}
              } onClick={()=>{
                taskFilterFunc('종료')
              }}>종료</p> */}
            </div>
            <div className="sort">
              <p className="sortBtn w120">담당자</p>
              <p className="sortBtn w80">중요도</p>
              <p className="sortBtn w120">라벨</p>
              <p className="sortBtn w80">작성자</p>
            </div>
          </div>
        
          <div className="taskList">
            <div className="taskRow">
              <p className="title">업무이름</p>
              <div className="infoWrap">
                {/* 담당자 */}
                <div className="profileWrap w120">

                  <div className="profileImg toolTipTopBox">
                    <p className="toolTip">사용자</p>
                    <div>
                      <img src={pub.img+'defaultProfile.svg'}/>
                    </div>
                  </div>
 
                </div>
                {/* 중요도 */}
                <p className={"type w80 "}>없음</p>
                {/* 라벨 */}
                <div className="label w120">
                  <b style={{backgroundColor:seqColorTrans(2)}}>
                    도움요청
                  </b>
            
                </div>
                {/* 작성자 */}
                <div className="profileImg writer toolTipTopBox">
                    <p className="toolTip">작성자</p>
                    <div>
                      <img src={pub.img+'defaultProfile.svg'}/>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}


function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
    isMaster:state.isMaster,
    projectInfo:state.projectInfo,
  }
}

export default connect(transReducer)(Task);