import axios from "axios";
import React, { useEffect, useState, useCallback } from "react"
import {pub, colors, pages, seqColorTrans,host} from '../Helper.js'
import StoneList from "./comp/StoneList.js";
import DatePicker from '../DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import NonePage from "../NonePage.js";



function MileStone(p){

  const history = useHistory();

  //마일스톤 만들기 모달 상태
  const [createModal, createModalCng] = useState(false)

  //마일스톤 만들기 정보
  const [mileStoneInfo, mileStoneInfoCng] = useState({
    milestone_title:'',
    milestone_content:'',
    milestone_startdate:'',
    milestone_duedate:'',
    project_seq:p.prjSeq,
  });

  //마일스톤 생성시 상태 업데이트
  const mileStoneInfoChange = e =>{
    const {value, name} = e.target;
    mileStoneInfoCng({
      ...mileStoneInfo,
      [name]: value
    })
    console.log(mileStoneInfo)
  }

  //날짜선택 이중모달 컨트롤
  let dateModalClose =useCallback((e)=>{
    if(!e.target.closest('.DayPicker_1') ){
      p.dispatch({type:'modalOff'})
      setTimeout(()=>{
        window.removeEventListener('click', dateModalClose)
      })
    }
  },[])

  //마일스톤 생성_제목 알림 상태
  let [alert, alertCng] = useState(false);


  //마일스톤 목록
  let [list, listCng] = useState();

  //배열에서 완료된 마일스톤 갯수 찾기
  const completeMileStoneCnt = (list) =>{
    let cnt = 0;
    list.map((r, i)=>{
      if(r.milestone_status ==1){
        cnt++;
      }
    })
    return cnt;
  }


  //프론트 작업용 샘플
  let listSample = [
    {
      milestone_seq : '1',
      milestone_title : '마일스톤1 제목',
      milestone_content : '',
      milestone_status : 0,
      milestone_isdelete : 0,
      milestone_startdate : '2020-11-11',
      milestone_duedate : '2020-12-11',
      milestone_enddate : '',
      project_seq: ''
    },
    {
      milestone_seq : '2',
      milestone_title : '마일스톤2 제목',
      milestone_content : '마일스톤2 설명',
      milestone_status : 0,
      milestone_isdelete : 0,
      milestone_startdate : '2020-11-11',
      milestone_duedate : '2020-12-11',
      milestone_enddate : '',
      projmember_seq : '',
      project_seq: ''
    },
    {
      milestone_seq : '3',
      milestone_title : '마일스톤3 제목',
      milestone_content : '마일스톤3 설명',
      milestone_status : 1,
      milestone_isdelete : 1,
      milestone_startdate : '',
      milestone_startdate : '2020-11-11',
      milestone_duedate : '2020-12-11',
      projmember_seq : '',
      project_seq: ''
    },
    {
      milestone_seq : '4',
      milestone_title : '마일스톤4 제목',
      milestone_content : '마일스톤4 설명',
      milestone_status : 1,
      milestone_isdelete : 0,
      milestone_startdate : '',
      milestone_startdate : '2020-11-11',
      milestone_duedate : '2020-12-11',
      projmember_seq : '',
      project_seq: ''
    },
    {
      milestone_seq : '4',
      milestone_title : '마일스톤4 제목',
      milestone_content : '마일스톤4 설명',
      milestone_status : 1,
      milestone_isdelete : 0,
      milestone_startdate : '',
      milestone_startdate : '2020-11-11',
      milestone_duedate : '2020-12-11',
      projmember_seq : '',
      project_seq: ''
    },
    {
      milestone_seq : '4',
      milestone_title : '마일스톤4 제목',
      milestone_content : '마일스톤4 설명',
      milestone_status : 1,
      milestone_isdelete : 0,
      milestone_startdate : '',
      milestone_startdate : '2020-11-11',
      milestone_duedate : '2020-12-11',
      projmember_seq : '',
      project_seq: ''
    },
    {
      milestone_seq : '4',
      milestone_title : '마일스톤4 제목',
      milestone_content : '마일스톤4 설명',
      milestone_status : 1,
      milestone_isdelete : 0,
      milestone_startdate : '',
      milestone_startdate : '2020-11-11',
      milestone_duedate : '2020-12-11',
      projmember_seq : '',
      project_seq: ''
    },
    {
      milestone_seq : '4',
      milestone_title : '마일스톤4 제목',
      milestone_content : '마일스톤4 설명',
      milestone_status : 1,
      milestone_isdelete : 0,
      milestone_startdate : '',
      milestone_startdate : '2020-11-11',
      milestone_duedate : '2020-12-11',
      projmember_seq : '',
      project_seq: ''
    },
    {
      milestone_seq : '4',
      milestone_title : '마일스톤4 제목',
      milestone_content : '마일스톤4 설명',
      milestone_status : 1,
      milestone_isdelete : 0,
      milestone_startdate : '',
      milestone_startdate : '2020-11-11',
      milestone_duedate : '2020-12-11',
      projmember_seq : '',
      project_seq: ''
    },
    {
      milestone_seq : '4',
      milestone_title : '마일스톤4 제목',
      milestone_content : '마일스톤4 설명',
      milestone_status : 1,
      milestone_isdelete : 0,
      milestone_startdate : '',
      milestone_startdate : '2020-11-11',
      milestone_duedate : '2020-12-11',
      projmember_seq : '',
      project_seq: ''
    },
    {
      milestone_seq : '4',
      milestone_title : '마일스톤4 제목',
      milestone_content : '마일스톤4 설명',
      milestone_status : 1,
      milestone_isdelete : 0,
      milestone_startdate : '',
      milestone_startdate : '2020-11-11',
      milestone_duedate : '2020-12-11',
      projmember_seq : '',
      project_seq: ''
    },
  ]

  useEffect(()=>{
    p.dispatch({type:'loadingOn'})
    axios.get(host+'/ajax/'+p.prjSeq+'/milestonelist')
    .then(r=>{
      console.log(r.data)
      listCng(r.data);
      p.dispatch({type:'loadingOff'})
    })
    .catch(e=>{
      console.log(e)
      p.dispatch({type:'loadingOff'})
    })
  
    // listCng(listSample)
  },[])

  return(
    <div className="pageContentWrap mileStoneWrap">
      
      <div className="header">
        <p className="title">&#x1F6A9; 마일스톤</p>
        <div className="toolTipTopBox">
          <p className="createBtn" style={{backgroundColor:p.prjColor}} onClick={()=>{
            createModalCng(true)
          }}>+ 마일스톤 만들기</p>
        </div>
      </div>

      <MileStoneCreateModal
        show={createModal}
        onHide={() => {
          createModalCng(false);
          p.dispatch({type:'modalOff'})
          window.removeEventListener('click', dateModalClose)
          mileStoneInfoCng({
            milestone_title:'',
            milestone_content:'',
            milestone_startdate:'',
            milestone_duedate:'',
            project_seq:p.prjSeq,
          })
          alertCng(false)
        }}
        dispatch={p.dispatch}
        mileStoneInfo={mileStoneInfo}
        mileStoneInfoCng={mileStoneInfoCng}
        mileStoneInfoChange={mileStoneInfoChange}
        dateModalClose={dateModalClose}
        alert={alert}
        alertCng={alertCng}
        listCng={listCng}
        prjSeq={p.prjSeq}
      />

      <div className="stoneListWrap">
        {
          list 
          ?
            list.map((row, i)=>{
              if(row.milestone_status==0 && row.milestone_isdelete == 0){
                return(
                  <StoneList 
                    prjSeq={p.prjSeq}
                    milestone_seq={row.milestone_seq}
                    milestone_title={row.milestone_title}
                    milestone_content={row.milestone_content}
                    color={seqColorTrans(row.milestone_seq)} 
                    completeTaskCnt={1}
                    taskCnt={2}
                    milestone_startdate={row.milestone_startdate}
                    milestone_duedate={row.milestone_duedate}
                  />
                )
              }
            })
          :null
        }
      </div>
      <div className="stoneListWrap">
        {
          list
          ?
            completeMileStoneCnt(list) > 0
            ?
            <p className="completeHead">&#x231B; 완료된 마일스톤</p>
            :null
          :null
        }
        {
          list
          ?
            completeMileStoneCnt(list) > 0
            ? 
              list.map((row, i)=>{
                if(row.milestone_status==1 && row.milestone_isdelete == 0){
                return(
                    <StoneList 
                      prjSeq={p.prjSeq}
                      milestone_seq={row.milestone_seq}
                      milestone_title={row.milestone_title}
                      milestone_content={row.milestone_content}
                      color={"#555555"} 
                      completeTaskCnt={1}
                      taskCnt={2}
                      milestone_startdate={row.milestone_startdate}
                      milestone_duedate={row.milestone_duedate}
                      milestone_status={row.milestone_status}
                      isComplete={true}
                    />
                  )
                }
              })
            :null
          :null
        }
      </div>
      

    </div>
  )
}

function MileStoneCreateModal(p) {

  return (
    <Modal
      {...p}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modalWrap"
      style={{marginTop:'-70px'}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="modalTitle">
          마일스톤 만들기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          p.alert
          ?
          <Alert variant={'danger'} style={{fontSize:'.8rem',marginBottom:'.4rem'}}>마일스톤 제목을 입력해주세요. &#x1F602;</Alert>
          : null
        }
        
        <Form.Group className="mb-2 piumInput" controlId="floatingInput">
          <FloatingLabel
            controlId="floatingInput"
            label="마일스톤 제목"
          >
            <Form.Control type="text" placeholder="마일스톤 제목" name="milestone_title" spellCheck="false" onChange={p.mileStoneInfoChange}/>
          </FloatingLabel>
        </Form.Group>
        

        <Form.Group className=" piumInput" controlId="floatingTextarea">
          <FloatingLabel controlId="floatingTextarea" label="설명">
            <Form.Control type="textarea" placeholder="설명" name="milestone_content" spellcheck="false" onChange={p.mileStoneInfoChange}/>
          </FloatingLabel>
        </Form.Group>

        <div className="datePickerWrap">
          <DatePicker
            pickerDateCng={p.mileStoneInfoCng}
            pickerDate={p.mileStoneInfo}
            pickerStartKey={'milestone_startdate'}
            pickerEndKey={'milestone_duedate'}
            dateModalClose={p.dateModalClose}
          />
          <p className="dateBtn" onClick={
            ()=>{
              p.dispatch({type:'modalOn'})
              setTimeout(()=>{
                window.addEventListener('click', p.dateModalClose)
              })
            }
          }>
            <i class="far fa-calendar-check"></i> 일정선택
          </p>
          <p className="dateInfo">
            {p.mileStoneInfo.milestone_startdate?(p.mileStoneInfo.milestone_startdate + " ~ "):''}
            {p.mileStoneInfo.milestone_duedate?p.mileStoneInfo.milestone_duedate:''}
          </p>
        </div>
        
      </Modal.Body>
      <Modal.Footer className="modalBtnWrap">
        <Button className="modalBtn" onClick={()=>{
          
          if(p.mileStoneInfo.milestone_title != ''){
            p.dispatch({type:'loadingOn'})
            axios.post(host+'/ajax/createMileStone', p.mileStoneInfo)
            .then(r=>{
              console.log(r)
              p.onHide();

              //목록새로고침
              axios.get(host+'/ajax/'+p.prjSeq+'/milestonelist')
              .then(r=>{
                console.log(r.data)
                p.listCng(r.data);
                p.dispatch({type:'loadingOff'})
              })
              .catch(e=>{
                console.log(e)
                p.dispatch({type:'loadingOff'})
              })
            })
            .catch(e=>{
              console.log(e)
              p.onHide();
              p.dispatch({type:'loadingOff'})
            })
          } else {
            p.alertCng(true)
          }
          // console.log('aa')
        }}>만들기</Button>

        

      </Modal.Footer>
    </Modal>
  );
}



function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(MileStone);