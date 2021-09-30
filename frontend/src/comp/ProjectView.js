import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors, pages, seqColorTrans,host} from './Helper.js'
import DatePicker from './DatePicker.js'
import HeadSide from './HeadSide.js'
import Todo from './page/Todo.js'
import Calender from './page/Calender.js'
import MileStone from './page/MileStone.js'
import MileStoneView from './page/MileStoneView.js'
import Task from './page/Task.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';



function ProjectList(p){
  const history = useHistory();
  const params = useParams();
  const page = params.page;
  const seq = params.seq;

  const prjColor = seqColorTrans(seq);


  //프로젝트리스트 (셀렉트)
  const [prjList, prjListCng] = useState();

  //현재 프로젝트 제목, 상태
  const [prjInfo, prjInfoCng] = useState();

  //내가 이 프로젝트의 관리자 인지
  const [isMaster, isMasterCng]= useState(false);

  //이 프로젝트의 내정보
  const [myMemberInfo,myMemberInfoCng]=useState();


  //프로필변경 모달 상태
  const [profileModal, profileModalCng] = useState(true);

  const profileModalClose = () => {
    profileModalCng(false)
  };
  const profileModalOpen = () => {
    profileModalCng(true)
  };

  //프로필 변경인지 변경알림인지
  const [profileMsg, profileMsgCng] = useState(true);
  
  //프로필 변경 정보
  const [profileSetInfo,profileSetInfoCng] = useState({img:'',name:''});
  //프로필 변경 이미지 미리보기용
  const [profileImgPreview,profileImgPreviewCng] =useState();
  //File 객체 base64로 변환
  const toBase64 = file => {
    let reader = new FileReader()
    reader.onload = e=> {
      profileImgPreviewCng(e.target.result);
    };
  
    reader.readAsDataURL(file);
  };
  


  useEffect(()=>{
    const isPage = pages.find(e=> e === page)
    if(isPage == undefined){
      history.push('/404')
    } else {
      p.dispatch({type:"pagePush", val:isPage})
    }

    // 프로젝트 정보 가져옴 (프론트용 샘플, myproject로 보내면댐)
    axios.get(host+'/ajax/myproject')
    .then(r=>{
      prjListCng(r.data);
      p.dispatch({type:'loadingOff'})
    })
    .catch(e=>{
      console.log(e)
      p.dispatch({type:'loadingOff'})
    })

  },[])

  useEffect(()=>{
    //현재 프로젝트 정보 갱신
    if(prjList){
      prjList.map((r,i)=>{
        if(seq == r.project_seq){
          prjInfoCng(r)
        }
      })
    }
    
  },[p.pageInfo,seq,prjList])
  useEffect(()=>{
    //프로필 수정용 데이터 입력
    if(myMemberInfo){
      profileSetInfoCng({
        ...profileSetInfo,
        name:myMemberInfo.projmember_name,
      })
    }
    
  },[myMemberInfo])

  return(
    <>
    {
      prjInfo ?
      <div className="viewOutWrap">
        <HeadSide prjColor={prjColor} prjSeq={seq} prjList={prjList} prjInfo={prjInfo} isMasterCng={isMasterCng} isMaster={isMaster} myMemberInfoCng={myMemberInfoCng}/>
        <div className="viewInnerWrap">
          {
            p.pageInfo == 'todo' &&
            <Todo prjColor={prjColor} prjSeq={seq} prjInfo={prjInfo} isMaster={isMaster}/>
          }
          {
            p.pageInfo == 'calender' &&
            <Calender prjColor={prjColor} prjSeq={seq}/>
          }
          {
            p.pageInfo == 'mileStone' &&
            <MileStone prjColor={prjColor} prjSeq={seq} prjInfo={prjInfo} isMaster={isMaster}/>
          }
          {
            p.pageInfo == 'mileStoneView' &&
            <MileStoneView prjColor={prjColor} prjSeq={seq} isMaster={isMaster}/>
          }
          {
            p.pageInfo == 'task' &&
            <Task prjColor={prjColor} prjSeq={seq}/>
          }
        </div>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={profileModal}
          onHide={profileModalClose}
          className={'profileModalWrap '+(profileMsg?'':'on')}
        >
          <div className="profileModalCon">
            <div className="msg">
              <b className="prjIcon" style={{backgroundColor:prjColor}}>
                {prjInfo.project_title.trim().substring(0,1)}
              </b>
              프로젝트에서 사용할<br/>
              <b>프로필 정보</b>를 완성해주세요. &#x1F603;
            </div>
            <img className="welcomeImg" src={pub.img+'profileSetting.svg'}/>
            <div className="btnWrap">
              <button className="submitBtn" onClick={()=>{
                profileMsgCng(false)
              }}>설정하기<i class="fas fa-long-arrow-alt-right"></i></button>

            </div>
          </div>


          <div className="profileModalCon">
            <input type="file" id="profileImg" accept=".jpg, .jpeg, .png, .svg" style={{display:'none'}} onChange={(e)=>{
              let file = e.target.files[0]
              profileSetInfoCng({
                ...profileSetInfo,
                img:file,
              })
              toBase64(file);
            
            }}/>
            <p className="profileSetTitle">
              <b>&#x1F4DD;</b> 프로필설정
            </p>
            <label htmlFor="profileImg" className="imgBtn">
              {
                myMemberInfo //여기는 나중에 없애셈..
                ?
                  profileImgPreview
                  ?
                    <img src={profileImgPreview}/>
                  :
                    myMemberInfo.projmember_data
                    ? <img src={'data:image;base64,'+myMemberInfo.projmember_data}/>
                    : <img src={pub.img+'defaultProfile.svg'}/>
                :null
              }
              <div className="imgBtnBack">
                <i class="fas fa-pen"></i>
              </div>
            </label>
            <Form.Group className=" piumInput" controlId="floatingTextarea">
              <FloatingLabel controlId="floatingTextarea" label="닉네임">
                <Form.Control type="textarea" placeholder="닉네임" name="project_content" value={profileSetInfo.name} spellCheck="false" onChange={(e)=>{
                  
                  profileSetInfoCng({
                    ...profileSetInfo,
                    name:e.target.value,
                  })
                }}/>
              </FloatingLabel>
            </Form.Group>
            <div className="btnWrap">
              <button className="submitBtn" onClick={(e)=>{
                p.dispatch({type:'loadingOn'})
                e.preventDefault();
                const formData = new FormData();
                formData.append('projmember_name', profileSetInfo.name)
                formData.append('projmember_image', profileSetInfo.img)
                formData.append('project_seq', seq)
            
                axios({
                  method:'post',
                  url:host+'/ajax/updateProfile',
                  data:formData,
                  headers: {"Content-Type": "multipart/form-data"}
                })
                .then(r=>{
                  p.dispatch({type:'loadingOff'})
                })
                .catch(e=>{
                  console.log(e)
                  p.dispatch({type:'loadingOff'})

                })
              }}>적용<i class="fas fa-check"></i></button>

            </div>
          </div>
          
            
        </Modal>
      </div>
      :null
    }
      
    </>
  )
}


function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
    pageInfo : state.pageInfo
  }
}

export default connect(transReducer)(ProjectList);