import axios from "axios";
import React, { useEffect, useState, useCallback } from "react"
import {pub, colors,host} from './Helper.js'
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
    title:'',
    sub:'',
    stDate:'',
    edDate:''
  });
  const { title, sub, stDate, edDate } = prjInfo;

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
    if(!e.target.closest('.datePickerWrap') ){
      p.dispatch({type:'modalOff'})
    }
  },[])

  //프로젝트 생성,수정_제목 알림 상태
  let [alert, alertCng] = useState(false);



  //프로젝트 목록

  // let [list, list]



  useEffect(()=>{
    axios.get(host+'/ajax/myproject')
    .then(r=>{
      console.log(r)
    })
    .catch(e=>{
      console.log(e)
    })
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
              colors.map((row, i)=>{
                return(
                  <ProjectCard color={row} key={i}/>
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
            title:'',
            sub:'',
            stDate:'',
            edDate:''
          });
          alertCng(false)
        }}
        title={title}
        sub={sub}
        stDate={stDate}
        edDate={edDate}
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
    console.log(p.alert)

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
            <Form.Control type="text" placeholder="프로젝트 제목" name="title" value={p.title} onChange={p.prjInfoChange}/>
          </FloatingLabel>
        </Form.Group>
        

        <Form.Group className=" piumInput" controlId="floatingTextarea">
          <FloatingLabel controlId="floatingTextarea" label="설명">
            <Form.Control type="textarea" placeholder="설명" name="sub" value={p.sub} onChange={p.prjInfoChange}/>
          </FloatingLabel>
        </Form.Group>

        <div className="datePickerWrap">
          <DatePicker
            stDate={p.stDate}
            edDate={p.edDate}
            prjInfoCng={p.prjInfoCng}
            prjInfo={p.prjInfo}
          />
          <p className="dateBtn" onClick={
            ()=>{
              p.datePickerModalControll({type:'modalOn'})
              window.addEventListener('click', p.dateModalClose)
            }
          }>
            <i class="far fa-calendar-check"></i> {p.stDate?'일정 수정':'일정 선택'}
          </p>
          <p className="dateInfo">
            {p.stDate?(p.stDate + " ~ "):''}
            
            {p.edDate?p.edDate:''}

          </p>
        </div>
        
      </Modal.Body>
      <Modal.Footer className="modalBtnWrap">
        <Button onClick={p.onHide} className="modalBtn" onClick={()=>{
          p.onHide()
          p.dispatch({type:'loadingOn'})
          console.log(p.prjInfo.title)
          if(p.prjInfo.title != ''){
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
