import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors, pages,seqColorTrans, host} from '../Helper.js'
import DatePicker from '../DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


function Task(p){

  //업무 중요도 배열
  const typeArr = {
    '10':'긴급',
    '20':'높음',
    '30':'보통',
    '40':'낮음',
    '50':'무시',
  }

  // 업무 필터
  const [taskFilter, taskFilterCng] = useState({
    myTaskFilter:'전체',
    mileFilter:'전체',
    priFilter:'전체',
    statusFilter:'전체',
  })

  // 필터 변경 핸들러
  const taskFilterChange = e =>{
    taskFilterCng({
      ...taskFilter,
      [e.target.name]:e.target.value
    })
  }

  //task 리스트
  const [taskList, taskListCng] = useState();

  //task 리스트 불러오기
  const taskListGetFunc = () =>{
    let listDummy = [];
    p.dispatch({type:'loadingOn'})
    axios.get(host+'/ajax/'+p.prjSeq+'/tasklist')
    .then(r=>{
      if(taskFilter.myTaskFilter != '전체'){
        listDummy = r.data.filter(rr => rr.projmember_seq == p.myMemberInfo.projmember_seq);
      } else {
        listDummy = r.data;
      }

      if(taskFilter.mileFilter != '전체'){
        listDummy = listDummy.filter(rr => Number(rr.milestone_seq) == Number(taskFilter.mileFilter));
      } else {
        listDummy = listDummy;
      }
      if(taskFilter.priFilter != '전체'){
        listDummy = listDummy.filter(rr => Number(rr.priority_code) == Number(taskFilter.priFilter));
      } else {
        listDummy = listDummy;
      }
      if(taskFilter.statusFilter != '전체'){
        if(taskFilter.statusFilter == '진행중'){
          listDummy = listDummy.filter(rr => Number(rr.task_status) == 0);
        }else if(taskFilter.statusFilter == '종료'){
          listDummy = listDummy.filter(rr => Number(rr.task_status) == 1);
        }
        
      } else {
        listDummy = listDummy;
      }
      
      
      // listDummy.map((rr,i)=>{
      //   console.log(Number(rr.milestone_seq))
        
      //   // if(rr.task_isdelete == '1'){
      //   //   listDummy.splice(i)
      //   //   // return false;
      //   // }

      //   // if(taskFilter.myTaskFilter != '전체'){
      //   //   if(Number(rr.projmember_seq) != Number(p.myMemberInfo.projmember_seq)){
      //   //     listDummy.splice(i)
      //   //     // return false;
      //   //   }
      //   // }

      //   // if(taskFilter.mileFilter != '전체'){
      //   //   if(Number(rr.milestone_seq) != Number(taskFilter.mileFilter)){
      //   //     listDummy.splice(i)
      //   //     // return false;
      //   //   }
      //   // }

      //   // if(taskFilter.priFilter != '전체'){
      //   //   if(Number(rr.priority_code) != Number(taskFilter.priFilter)){
      //   //     listDummy.splice(i)
      //   //     // return false;
      //   //   }
      //   // }

      // })

      console.log('listDummy')
      console.log(listDummy)
      p.dispatch({type:'loadingOff'})
      taskListCng(listDummy)

    })
    .catch(e=>{
      console.log(e)
      p.dispatch({type:'loadingOff'})
    })  
  }

  //멤버정보 가져오기
  const memberInfoGetFunc = (seq) =>{
    let info = {
      name:'',
      data:''
    }
    if(p.memberList){
      p.memberList.map(r=>{
        if(r.projmember_seq == seq){
          if(r.projmember_data){
            info.data = 'data:image;base64,'+r.projmember_data;
          }else{
            info.data = pub.img+'defaultProfile.svg'
          }
          if(r.projmember_name){
            info.name = r.projmember_name
          }else {
            info.name = '#'+r.member_seq
          }
        }
      })
    }
    
    return info;
  }
  
  useEffect(()=>{
    taskFilterCng({
      myTaskFilter:'전체',
      mileFilter:'전체',
      priFilter:'전체',
      statusFilter:'전체',
    })
    if(p.myMemberInfo){
      taskListGetFunc();
    }
  },[])

  useEffect(()=>{
    if(p.myMemberInfo){
      taskListGetFunc();
    }
  },[taskFilter, p.myMemberInfo])

  console.log('taskList')
  console.log(taskList)
  console.log('taskFilter')
  console.log(taskFilter)

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
          {/* <p className="title"><i class="fas fa-filter"></i>업무 필터</p> */}
          
          <Form.Check 
            type="radio"
            name="myTaskFilter"
            label="전체 업무"
            value="전체"
            id="myTaskFilter1"
            checked={taskFilter.myTaskFilter=='전체'?true:false}
            onChange={taskFilterChange}
          />

          <Form.Check 
            type="radio"
            name="myTaskFilter"
            label="내 업무"
            value="내업무"
            ㅊ
            id="myTaskFilter2"
            onChange={taskFilterChange}
          />
          <hr/>
          <p className="title">마일스톤</p>
          <Form.Check 
            type="radio"
            name="mileFilter"
            value="전체"
            label="전체"
            id={"mileFilter0"}
            checked={taskFilter.mileFilter=='전체'?true:false}
            onChange={taskFilterChange}
          />
          {
            p.mileStoneList&&
              p.mileStoneList.length >0
              ?
                p.mileStoneList.map((r,i)=>{
                  return(
                    <Form.Check 
                      type="radio"
                      name="mileFilter"
                      value={r.milestone_seq}
                      label={r.milestone_title}
                      id={"mileFilter"+(i+1)}
                      checked={taskFilter.mileFilter==r.milestone_seq?true:false}
                      onChange={taskFilterChange}
                    />
                  )
                })
              : null
          }
          <hr/>
          <p className="title">중요도</p>
          <Form.Check 
            type="radio"
            name="priFilter"
            value="전체"
            label="전체"
            id={"priFilter0"}
            checked={taskFilter.priFilter=='전체'?true:false}
            onChange={taskFilterChange}
          />
          {
            Object.keys(typeArr).map((key, i)=>{
              return(
                <Form.Check 
                  type="radio"
                  name="priFilter"
                  value={key}
                  label={typeArr[key]}
                  id={"priFilter"+(i+1)}
                  checked={taskFilter.priFilter==key?true:false}
                  onChange={taskFilterChange}
                />
              )

            })
            
          }
          
        </div>
        <div className="taskListWrap">
          <div className="taskHeader">
            <div className="filter">
              
              <p style={
                taskFilter.statusFilter == '전체'?
                {backgroundColor:p.prjColor,color:'#fff'}
                :{color:p.prjColor}
                } onClick={()=>{
                  taskFilterCng({
                    ...taskFilter,
                    statusFilter:'전체'
                  })
                }}>전체</p>
              <p style={
                taskFilter.statusFilter == '진행중'?
                {backgroundColor:p.prjColor,color:'#fff'}
                :{color:p.prjColor}
              } onClick={()=>{
                taskFilterCng({
                  ...taskFilter,
                  statusFilter:'진행중'
                })
              }}>진행중</p>
              <p style={
                taskFilter.statusFilter == '종료'?
                {backgroundColor:p.prjColor,color:'#fff'}
                :{color:p.prjColor}
              } onClick={()=>{
                taskFilterCng({
                  ...taskFilter,
                  statusFilter:'종료'
                })
              }}>종료</p>
            </div>
            <div className="sort">
              <p className="sortBtn w120">담당자</p>
              <p className="sortBtn w80">중요도</p>
              <p className="sortBtn w120">라벨</p>
              <p className="sortBtn w80">작성자</p>
            </div>
          </div>
          <div className="taskList">
            
            {
              taskList
              ?
                taskList.length>0
                ?
                  taskList.map(r=>{
                    let writerInfo = memberInfoGetFunc(r.projmember_seq)
                    if(r.task_isdelete == '0'){
                      return(
                        <div className="taskRow">
                          <p className="title">{r.task_title}</p>
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
                            <p className={"type w80 " + (r.priority_code?typeArr[r.priority_code]:'없음')}>{r.priority_code?typeArr[r.priority_code]:'없음'}</p>
                            {/* 라벨 */}
                            <div className="label w120">
                              <b style={{backgroundColor:seqColorTrans(r.label_seq)}}>
                                라벨 불러와야함
                              </b>
                        
                            </div>
                            {/* 작성자 */}
                            <div className="profileImg writer toolTipTopBox">
                              <p className="toolTip">{writerInfo.name}</p>
                              <div>
                                <img src={writerInfo.data}/>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  
                  })
                :<div className="noTaskMsg">업무가 없습니다.</div>
              :<Box sx={{ width: '100%' }}><LinearProgress /></Box>
            }
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
    memberList:state.memberList,
    myMemberInfo:state.myMemberInfo,
    mileStoneList : state.mileStoneList,
  }
}

export default connect(transReducer)(Task);