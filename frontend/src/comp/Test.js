
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {pub, host} from './Helper.js'
import '../css/test.css';
const { naver } = window;

function Test(){
  const googleCid = process.env.REACT_APP_GOOGLE_CID;
  const naverCid = process.env.REACT_APP_NAVER_CID;
  const naverSecret = process.env.REACT_APP_NAVERS_CID;
  const kakaoCid = process.env.REACT_APP_KAKAO_CID;
  const location = useLocation();
  function naverGetId(){
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    const state = location.hash.split('&state=')[1].split('&token_type=')[0]
    axios.post(host+'/ajax/naverUser',{
      'access_token' : token,
      'state' : state
    })
    .then(r=>{
      console.log(r)
    })
    .catch(e=>{
      console.log(e)
    })

  }
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
      {/*<p>컴포넌트 경로 : src/comp/Test.js</p>*/}
      {/*<hr/>*/}
      {/*<p>모듈 추가시 꼭 --save를 붙혀주세요.</p>*/}
      {/*<p>예시: npm install react-redux --save (yarn 사용시 yarn add react-redux --save)</p>*/}
      {/*<p>페이지 추가시 App.js에서 Test 컴포넌트 있는 부분 보시고 추가하시면 됩니당 잘 안되면 문의</p>*/}

      {/*  <p onClick={()=>{*/}

      {/*  }}>테스트용버튼</p>*/}
        <div className="app">
            <header>
                <br/>
                <br/>
                <p>To Do List</p>&emsp;&emsp;&emsp;&emsp;<p>알림</p>
                <br/>
            </header>
            <div className="lists">
                <div className="list">
                    <div className="list-label">To do</div>
                    <div className="list-item" draggable="true">item 1</div>
                    <div className="list-item" draggable="true">item 2</div>
                    <div className="list-item" draggable="true">item 3</div>
                </div>
                <div className="list">
                    <div className="list-label">In Progress</div>
                </div>
                <div className="list">
                    <div className="list-label">Done</div>
                </div>
            </div>
        </div>
    </>
  )
}
export default Test;
