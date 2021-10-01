import axios from "axios";
import React, { useEffect, useState,useCallback } from "react"
import {pub, colors, pages, seqColorTrans, host} from '../Helper.js'
import DatePicker from '../DatePicker.js'
import StoneList from "./comp/StoneList.js";

import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import NonePage from "../NonePage.js";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';





function MileStoneView(p){
  const params = useParams();
  const history = useHistory();
  const mileStoneSeq = params.pageSeq;

  //마일스톤 정보
  const [mileStoneInfo, mileStoneInfoCng] = useState();

  //마일스톤의 업무 리스트
  const [taskList, taskListCng] = useState();

  let dateModalClose =useCallback((e)=>{
    if(!e.target.closest('.DayPicker_1') ){
      
      p.dispatch({type:'modalOff'})
      setTimeout(()=>{
        window.removeEventListener('click', dateModalClose)
      })
    }
  },[])

  const memberInfoGetFunc = (seq) =>{
    let info = {
      name:'',
      data:''
    }
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
    return info;
  }


  const mileStoneUpdate = (info) =>{
    p.dispatch({type:'loadingOn'})

    axios.post(host+'/ajax/updateMileStone', info)
    .then(r=>{
      axios.get(host+'/ajax/milestone/'+mileStoneSeq)
      .then(r=>{
        // console.log(r.data)
        
        mileStoneInfoCng(r.data)
        
        p.dispatch({type:'loadingOff'})
      })
      .catch(e=>{
        console.log(e)
        p.dispatch({type:'loadingOff'})
      })

    })
    .catch(e=>{
      console.log(e)
      p.dispatch({type:'loadingOff'})
    })
  }

  const mileStoneDateNull = () =>{
    p.dispatch({type:'loadingOn'})

    axios.get(host+'/ajax/setDateEmpty/'+mileStoneSeq)
    .then(r=>{
      axios.get(host+'/ajax/milestone/'+mileStoneSeq)
      .then(r=>{
        mileStoneInfoCng(r.data)
        p.dispatch({type:'loadingOff'})
      })
      .catch(e=>{
        console.log(e)
        p.dispatch({type:'loadingOff'})
      })

    })
    .catch(e=>{
      console.log(e)
      p.dispatch({type:'loadingOff'})
    })
  }

  useEffect(()=>{

    //마일스톤 정보
    p.dispatch({type:'loadingOn'})
    axios.get(host+'/ajax/milestone/'+mileStoneSeq)
    .then(r=>{
      mileStoneInfoCng(r.data)
      p.dispatch({type:'loadingOff'})

    })
    .catch(e=>{
      console.log(e)
      p.dispatch({type:'loadingOff'})
    })

    // 마일스톤 하위 업무 리스트
    axios.get(host+'/ajax/milestone/'+mileStoneSeq+'/tasks')
    .then(r=>{
      taskListCng(r.data)
      p.dispatch({type:'loadingOff'})
    })
    .catch(e=>{
      console.log(e)
      p.dispatch({type:'loadingOff'})
    })
  },[])

  console.log(taskList)
  console.log(p.memberList)

  return(
    <div className="pageContentWrap mileStoneWrap">
      

      <div className="stoneListWrap">
        {
          mileStoneInfo &&
          <>
            <StoneList 
              prjSeq={p.prjSeq}
              milestone_seq={1}
              milestone_title={mileStoneInfo.milestone_title}
              milestone_content={mileStoneInfo.milestone_content}
              color={seqColorTrans(mileStoneInfo.milestone_seq)} 
              
              completeTaskCnt={mileStoneInfo.closedTask}
              taskCnt={mileStoneInfo.countTask}
              milestone_startdate={mileStoneInfo.milestone_startdate}
              milestone_duedate={mileStoneInfo.milestone_duedate}
              isView={true}
              dateModalClose={dateModalClose}
              mileStoneInfoCng={mileStoneInfoCng}
              mileStoneInfo={mileStoneInfo}
              mileStoneUpdate={mileStoneUpdate}
              mileStoneDateNull={mileStoneDateNull}
            />
            <div className="mileStoneTaskWrap">
              <div className="taskHeader">
                <div className="filter">
                  <p style={{backgroundColor:p.prjColor,color:'#fff'}}>전체</p>
                  <p style={{color:p.prjColor}}>진행중</p>
                  <p style={{color:p.prjColor}}>종료</p>
                </div>
                <div className="sort">
                  <p className="sortBtn w120">담당자 <i class="fas fa-caret-down"></i></p>
                  <p className="sortBtn w80">중요도 <i class="fas fa-caret-down"></i></p>
                  <p className="sortBtn w120">라벨 <i class="fas fa-caret-down"></i></p>
                  <p className="sortBtn w80">작성자 <i class="fas fa-caret-down"></i></p>
                </div>
              </div>
            {
              taskList
              ?
                taskList.length != 0
                ? 
                  taskList.map((r,i)=>{
                    const typeArr = {
                      '10':'긴급',
                      '20':'높음',
                      '30':'보통'
                    }
                    let writerInfo = memberInfoGetFunc(r.task.projmember_seq)

                    return(
                      r.task.task_isdelete != 1
                      ?
                        <div className="taskList">
                        <div className="taskRow">
                          <p className="title">{r.task.task_title}</p>
                          <div className="infoWrap">
                            {/* 담당자 */}
                            <div className="profileWrap w120">

                              {
                                r.taskMembers
                                ?
                                  r.taskMembers.map(r=>{
                                    let chargeInfo = memberInfoGetFunc(r.projmember_seq)
                                    return(
                                      <div className="profileImg toolTipTopBox">
                                        <p className="toolTip">{chargeInfo.name}</p>
                                        <div>
                                          <img src={chargeInfo.data}/>
                                        </div>
                                      </div>
                                    )
                                  })
                                :<b>없음</b>
                              }
                              


                            </div>
                            {/* 중요도 */}
                            <p className={"type w80 " + (r.task.priority_code?typeArr[r.task.priority_code]:'없음')}>{r.task.priority_code?typeArr[r.task.priority_code]:'없음'}</p>
                            {/* 라벨 */}
                            <div className="label w120">
                              {
                                r.label 
                                ?
                                  <b style={{backgroundColor:seqColorTrans(r.label.label_seq)}}>
                                    {r.label.label_title}
                                  </b>
                                : 
                                  <b style={{backgroundColor:'#ccc',color:'#555'}}>
                                    없음
                                  </b>
                              }
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
                      </div>
                      :null
                    )
                  })
                : <p className="noTaskMsg">업무가 없습니다.</p>
              : <Box sx={{ width: '100%' }}><LinearProgress /></Box>
            }
            </div>
          </>
        }
        
        
        

      


      </div>

    </div>
  )
}


function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
    memberList:state.memberList
  }
}

export default connect(transReducer)(MileStoneView);