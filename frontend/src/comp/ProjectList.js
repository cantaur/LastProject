import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors} from './Helper.js'
import DatePicker from './DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';






//카드의 컬러 index는 seq / 10의 나머지값으로 함
function ProjectList(p){
  let [modalShow, setModalShow] = useState(false);
 
  return(
    <>
      <div className="pListTop outerWrap">
        <div className="innerWrap">
          <img src={pub.img+'logo.svg'}/>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
              test@gmail.com
            </Dropdown.Toggle>

            <Dropdown.Menu style={{'minWidth':'unset','width':'100%'}}>
              
              <Dropdown.Item onClick={()=>{
                setModalShow(true)
              }}style={{'fontSize':'.8rem'}}>프로젝트 생성</Dropdown.Item>
              <Dropdown.Item href="sign/login" style={{'fontSize':'.8rem'}}>로그아웃</Dropdown.Item>
            
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
      

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          p.dispatch({type:'modalOff'})
        }}
        datePickerModalControll={p.dispatch}
        datePickerModal={p.datePickerModal}
      />
      
    </>
  )
}

function ProjectCard(p){
  return(
    <div className="projectCard">
      <div className="typeWrap">
        <p className="admin">관리자</p>
        <p className="end">마감일 지남</p>
        <p className="go">진행중</p>
      </div>
      <p className="title">프로젝트의 제목이 들어갈 공간입니다아아아</p>
      <p className="sub">프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명</p>
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
        <div className="toolTip" style={{'marginLeft':'-47.33px'}}>새 프로젝트 생성</div>
      </i>
    </div>
  )
}



function MyVerticallyCenteredModal(p) {
  return (
    <Modal
      {...p}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modalWrap"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="modalTitle">
          새 프로젝트 생성
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-2 piumInput" controlId="floatingInput">
          <FloatingLabel
            controlId="floatingInput"
            label="프로젝트 제목"
          >
            <Form.Control type="text" placeholder="프로젝트 제목" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className=" piumInput" controlId="floatingTextarea">
          <FloatingLabel controlId="floatingTextarea" label="설명">
            <Form.Control type="textarea" placeholder="설명" />
          </FloatingLabel>
        </Form.Group>
        <div className="datePickerWrap">
          <DatePicker/>
          <p className="dateBtn datePickerWrap" onClick={
            ()=>{
              p.datePickerModalControll({type:'modalOn'})
            }
          }>
            프로젝트 일정
          </p>
        </div>
        
      </Modal.Body>
      <Modal.Footer className="modalBtnWrap">
        <Button onClick={p.onHide} className="modalBtn danger">완료처리</Button>
        <Button onClick={p.onHide} className="modalBtn">생성하기</Button>
      </Modal.Footer>
    </Modal>
  );
}



function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(ProjectList);