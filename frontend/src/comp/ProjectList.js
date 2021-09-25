import axios from "axios";
import React, { useEffect, useState, useCallback } from "react"
import {pub, colors,host,seqColorTrans} from './Helper.js'
import DatePicker from './DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';






//카드의 컬러 index는 seq / 10의 나머지값으로 함
function ProjectList(p){
  const history = useHistory();

  //프로젝트 생성, 수정_모달 상태
  let [modalShow, setModalShow] = useState(false);

  //프로젝트 생성, 수정_정보
  const [prjInfo, prjInfoCng] = useState({
    project_title:'',
    project_content:'',
    project_startdate:'',
    project_duedate:''
  });
  const { project_title, project_content, project_startdate, project_duedate } = prjInfo;

  //프로젝트 생성, 수정시 상태 업데이트
  const prjInfoChange = e =>{
    const {value, name} = e.target;
    prjInfoCng({
      ...prjInfo,
      [name]: value
    })
  }

  //프로젝트 생성, 수정 날짜성택 이중모달 컨트롤
  let dateModalClose =useCallback((e)=>{
    if(!e.target.closest('.DayPicker_1') ){
      p.dispatch({type:'modalOff'})
      setTimeout(()=>{
        window.removeEventListener('click', dateModalClose)
      })
    }
  },[])

  //프로젝트 생성,수정_제목 알림 상태
  let [alert, alertCng] = useState(false);



  //프로젝트 목록
  let [list, listCng] = useState();

  // const prjStatusFn = (date, ) => {
    
  // }




  useEffect(()=>{
    // axios.get(host+'/ajax/myproject')
    // .then(r=>{
    //   console.log(r)
    // })
    // .catch(e=>{
    //   console.log(e)
    // })
    let listSample = [
      {
        member_seq: 4,
        project_content: "내용입니다아1",
        project_duedate: "2021-11-25",
        project_enddate: "",
        project_isdelete: "0",
        project_seq: 1,
        project_startdate: "2021-09-25",
        project_status: "0",
        project_title: "진행중프로젝트1"
      },
      {
        member_seq: 42,
        project_content: "내용입니다아2",
        project_duedate: "2022-11-25",
        project_enddate: "",
        project_isdelete: "0",
        project_seq: 1,
        project_startdate: "2021-09-25",
        project_status: "0",
        project_title: "진행중프로젝트2"
      },
    ]
    listCng(listSample);
  },[])

  return(
    <>
      <div className="pListTop outerWrap">
        <div className="innerWrap">
          <img src={pub.img+'logo.svg'}/>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
              {p.loginUser.email != ''?p.loginUser.email:'유저 정보 없음'}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{'minWidth':'unset','width':'100%'}}>
              
              <Dropdown.Item onClick={()=>{
                setModalShow(true)
              }}style={{'fontSize':'.8rem'}}>프로젝트 만들기</Dropdown.Item>
              <Dropdown.Item href="sign/login" style={{'fontSize':'.8rem'}} onClick={()=>{
                window.location.href = host+'/logout'
              }}>로그아웃</Dropdown.Item>
            
            </Dropdown.Menu>
          </Dropdown>
        </div>
        
      </div>

      <div className="outerWrap">
        <div className="innerWrap pListWrap">
          <h4 className="active">진행중인 프로젝트 &#x1F680;</h4>
          <div className="cardWrap">
            {
              
              list &&
              list.map((row, i)=>{
                return(
                  <ProjectCard 
                    color={seqColorTrans(row.member_seq)}
                    title={row.project_title}
                    content={row.project_content}
                    startDate={row.project_startdate}
                    dueDate={row.project_duedate}
                    key={i}
                  />
                )
              })
            }
            <AddProject show={()=>setModalShow(true)}/>
          </div>
          <h4 className="inActive">완료된 프로젝트 &#x1F648;</h4>
          <div className="cardWrap">
            <NoProject title="완료된 프로젝트"/>
          </div>
        </div>
      </div>
      

      <ProjectCreateModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          p.dispatch({type:'modalOff'})
          window.removeEventListener('click', dateModalClose)
          prjInfoCng({
            project_title:'',
            project_content:'',
            project_startdate:'',
            project_duedate:''
          });
          alertCng(false)
        }}
        project_title={project_title}
        project_content={project_content}
        project_startdate={project_startdate}
        project_duedate={project_duedate}
        dateModalClose={dateModalClose}
        datePickerModalControll={p.dispatch}
        prjInfoCng={prjInfoCng}
        prjInfo={prjInfo}
        prjInfoChange={prjInfoChange}
        dispatch={p.dispatch}
        alert={alert}
        alertCng={alertCng}
      />
      
    </>
  )
}

function ProjectCard(p){
  
  const history = useHistory();

  return(
    <div className="projectCard">
      <div className="typeWrap">
        <p className="admin">관리자</p>
        <p className="end">마감일 지남</p>
        <p className="go">진행중</p>
      </div>
      <p className="title" onClick={()=>{
        history.push('/project/100/kanban')
      }}>프로젝트의 제목이 들어갈 공간입니다아아아</p>
      <p className="sub">프로젝트 설명이 없습니다.</p>
      <div className="date"><i class="far fa-clock"></i> 2021-09-18 ~ 2021-09-20</div>
      <div className="icon" style={{backgroundColor:p.color}}>프</div>
    </div>
  )
}
function NoProject(p){
  return(
    <div className="noProjectMsg">
      <p>&#x1F605;</p>
      {p.title}가 없습니다.
    </div>
  )
}
function AddProject(p){
  
  return(
    <div className="addProjectBtn">
      <i class="fas fa-plus toolTipBox" onClick={p.show}>
        <div className="toolTip" style={{'marginLeft':'-47.33px'}}>새 프로젝트 만들기</div>
      </i>
    </div>
  )
}



function ProjectCreateModal(p) {
  useEffect(()=>{

  })
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
          새 프로젝트 만들기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          p.alert
          ?
          <Alert variant={'danger'} style={{fontSize:'.8rem',marginBottom:'.4rem'}}>프로젝트 제목을 입력해주세요.</Alert>
          : null
        }
        
        <Form.Group className="mb-2 piumInput" controlId="floatingInput">
          <FloatingLabel
            controlId="floatingInput"
            label="프로젝트 제목"
          >
            <Form.Control type="text" placeholder="프로젝트 제목" name="project_title" value={p.project_title} onChange={p.prjInfoChange}/>
          </FloatingLabel>
        </Form.Group>
        

        <Form.Group className=" piumInput" controlId="floatingTextarea">
          <FloatingLabel controlId="floatingTextarea" label="설명">
            <Form.Control type="textarea" placeholder="설명" name="project_content" value={p.project_content} onChange={p.prjInfoChange}/>
          </FloatingLabel>
        </Form.Group>

        <div className="datePickerWrap">
          <DatePicker
            project_startdate={p.project_startdate}
            project_duedate={p.project_duedate}
            prjInfoCng={p.prjInfoCng}
            prjInfo={p.prjInfo}
          />
          <p className="dateBtn" onClick={
            ()=>{
              p.datePickerModalControll({type:'modalOn'})
              setTimeout(()=>{
                window.addEventListener('click', p.dateModalClose)
              })
            }
          }>
            <i class="far fa-calendar-check"></i> {p.project_startdate?'일정 수정':'일정 선택'}
          </p>
          <p className="dateInfo">
            {p.project_startdate?(p.project_startdate + " ~ "):''}
            
            {p.project_duedate?p.project_duedate:''}

          </p>
        </div>
        
      </Modal.Body>
      <Modal.Footer className="modalBtnWrap">
        <Button onClick={p.onHide} className="modalBtn" onClick={()=>{
          p.onHide()
          p.dispatch({type:'loadingOn'})
          if(p.prjInfo.project_title != ''){
            axios.post(host+'/ajax/createProject',p.prjInfo)
            .then(r=>{
              p.dispatch({type:'loadingOff'})
              console.log(r)
            })
            .catch(e=>{
              p.dispatch({type:'loadingOff'})

              console.log(e)
            })

          }else {
            p.alertCng(true)
            p.dispatch({type:'loadingOff'})

          }
          
        }}>만들기</Button>
        {/* <Button onClick={p.onHide} className="modalBtn danger">완료처리</Button> */}

      </Modal.Footer>
    </Modal>
  );
}



function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
    loginUser : state.loginUser,
    loading:state.loading
  }
}

export default connect(transReducer)(ProjectList);
