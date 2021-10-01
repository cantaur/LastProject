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
import { Link, useParams, withRouter, useHistory, useLocation } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';



function ProjectView(p){
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const page = params.page;
  const prjSeq = params.seq;
  const prjColor = seqColorTrans(prjSeq);


  //이 프로젝트의 내정보
  const [myMemberInfo,myMemberInfoCng]=useState();


  //프로필변경 모달 상태
  const [profileModal, profileModalCng] = useState(false);

  const profileModalClose = () => {
    profileModalCng(false)
  };
  const profileModalOpen = () => {
    profileModalCng(true)
  };

  //프로필 변경인지 변경알림인지
  const [profileMsg, profileMsgCng] = useState(false);
  
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
  

  //페이지 최초 접속시
  useEffect(()=>{
    
    const isPage = pages.find(e=> e === page)
    if(isPage == undefined){
      history.push('/404')
    } else {
      p.dispatch({type:"pagePush", val:isPage})
    }

    // 프로젝트 리스트 가져옴
    axios.get(host+'/ajax/myproject') //프론트용 샘플
    .then(r=>{
      p.dispatch({type:'projectListCng', val:r.data})
    })
    .catch(e=>{
      console.log(e)
    })

    //멤버정보 가져옴
    axios.get('/ajax/allProjMembers/'+prjSeq)
    .then(r=>{
      p.dispatch({type:'memberListCng', val:r.data})
    })
    .catch(e=>{
      console.log(e)
    })


  },[location])

  // 프로젝트 리스트를 가져온 후
  useEffect(()=>{
    //프론트용 샘플
    // p.dispatch({type:'login', email:'sudosoon@gmail.com', seq:3})

    //현재 프로젝트 정보 갱신
    if(p.projectList){
      p.projectList.map((r,i)=>{
        if(prjSeq == r.project_seq){
          p.dispatch({type:'projectInfoCng', val:r})
        }
      })
    }
    
  },[p.projectList])

  //현재 프로젝트 정보 갱신한 후
  useEffect(()=>{
    console.log(p.loginUser.seq)
    //현재 프로젝트의 내 멤버 정보
    if(p.memberList){
      p.memberList.map((r,i)=>{
        //실제
        if(r.member_seq == p.loginUser.seq){
          if(r.projmember_type == 0){
            p.dispatch({type:'isMasterCng', val:true})
          }
          p.dispatch({type:'myMemberInfoCng', val:r})
        }
      })
    }

  },[p.memberList])


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
      p.projectInfo ?
      <div className="viewOutWrap">
        <HeadSide 
          prjColor={prjColor} 
          prjSeq={prjSeq} 
          profileMsg={profileMsg} 
          profileMsgCng={profileMsgCng} 
          profileModalCng={profileModalCng}
        />
        <div className="viewInnerWrap">
          {
            p.pageInfo == 'todo' &&
            <Todo prjColor={prjColor} prjSeq={prjSeq} />
          }
          {
            p.pageInfo == 'calender' &&
            <Calender prjColor={prjColor} prjSeq={prjSeq}/>
          }
          {
            p.pageInfo == 'mileStone' &&
            <MileStone prjColor={prjColor} prjSeq={prjSeq} />
          }
          {
            p.pageInfo == 'mileStoneView' &&
            <MileStoneView prjColor={prjColor} prjSeq={prjSeq} />
          }
          {
            p.pageInfo == 'task' &&
            <Task prjColor={prjColor} prjSeq={prjSeq}/>
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
                {p.projectInfo.project_title.trim().substring(0,1)}
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
            <input type="file" id="profileImg" accept=".jpg, .jpeg, .png" style={{display:'none'}} onChange={(e)=>{
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
                }}
                onKeyPress={(e)=>{
                  if(e.key == 'Enter'){
                    p.dispatch({type:'loadingOn'})
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append('projmember_name', profileSetInfo.name)
                    formData.append('projmember_image', profileSetInfo.img)
                    formData.append('project_seq', prjSeq)
                
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
                  }
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
                formData.append('project_seq', prjSeq)
            
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
    loginUser:state.loginUser,
    pageInfo : state.pageInfo,
    projectList:state.projectList,
    projectInfo:state.projectInfo,
    memberList:state.memberList,
    myMemberInfo:state.myMemberInfo,
    isMaster:state.isMaster,
    isProfileEmpty:state.isProfileEmpty
  }
}

export default connect(transReducer)(ProjectView);