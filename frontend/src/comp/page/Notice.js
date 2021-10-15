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
    <div className="fileListWrap pageContentWrap">
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
        
      <div className="fileListViewWrap">
        <div className="fileHeader">
          <p className="w400">알림 내용</p>
          <p className="file w200">파일 크기</p>
          <p className="file w200">공유된 날짜</p>
          <p className="file w200">공유한 사람</p>
        </div>

        <div className="fileList">
          <div className="fileRow">
              <p className="fileName">
                  <div className="fileInfo">
                      <p >제목제목</p>
                      <div>제목 > 제목</div>
                  </div>

              </p>

              {/* 파일크기 */}
              <p className="fileSize">ㅇㄴㅁㅇㄹ</p>
              {/* 공유된 날짜 */}
              <p className="fileDate">2020-10-10</p>
              {/* 작성자 */}
              <div className="uploader">
                  <div className="profileImg toolTipTopBox w200">
                      {/* <p className="toolTip">{writer.name}</p> */}
                      <div>
                          {/* <img src={writer.data}/> */}
                      </div>
                  </div>
              </div>


          </div>
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

export default connect(transReducer)(Notice)