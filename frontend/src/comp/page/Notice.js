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

  //새로운 알림 목록
  const [noticeList, noticeListCng] = useState([]);

  //확인한 알림 목록
  const [noticeDoneList, noticeDoneListCng] = useState([]);

  //알림 문구 arr
  const noticeMsg ={
    '업무배정':{
      'msg':'업무에 배정되었습니다.',
      'type':'task',
      'seq':'task_seq',
    },
    'mention':{
      'msg':'멘션된 코멘트가 등록되었습니다.',
      'type':'task',
      'seq':'task_seq'
    },
    'addtask':{
      'msg':'새로운 업무가 등록되었습니다.',
      'type':'task',
      'seq':'task_seq'
    },
    'addmile':{
      'msg':'새로운 마일스톤이 등록되었습니다.',
      'type':'mileStoneView',
      'seq':'milestone_seq'
    }
  }

  useEffect(()=>{

  },[])
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
      
      <div className="noticeSection">&#x1F4E3; 새로운 알림</div>
      <div className="fileListViewWrap">
        <div className="fileHeader">
          <p className="w400">알림 내용</p>
          <p className="file w200">마일스톤</p>
          <p className="file w200">업무</p>
          <p className="file w200">공유된 날짜</p>
          <p className="file w200">공유한 사람</p>
        </div>

        <div className="fileList">
          <div className="fileRow">
              <p className="fileName">
                  <div className="fileInfo">
                      <span>제목제목</span>
                  </div>
              </p>

              <p className="fileSize linked">ㅇㄴㅁㅇㄹ</p>
              <p className="fileSize linked">ㅇㄴㅁasdfsdfafsdㅇㄹ</p>

              <p className="fileDate">2020-10-10</p>
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
      
      <div className="noticeSection">&#x1F4CC; 확인한 알림</div>
      <div className="fileListViewWrap">
        <div className="fileList">
          <div className="fileRow">
              <p className="fileName">
                  <div className="fileInfo">
                      <span>제목제목</span>
                  </div>
              </p>

              <p className="fileSize linked">ㅇㄴㅁㅇㄹ</p>
              <p className="fileSize linked">ㅇㄴㅁasdfsdfafsdㅇㄹ</p>

              <p className="fileDate">2020-10-10</p>
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