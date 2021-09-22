
import React, {useState, useEffect} from 'react';
import {pub, host} from './Helper.js'

const { naver } = window;

function Test(){
  const googleCid = process.env.REACT_APP_GOOGLE_CID;
  const naverCid = process.env.REACT_APP_NAVER_CID;
  const kakaoCid = process.env.REACT_APP_KAKAO_CID;
  
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: naverCid,
      callbackUrl: 'http://localhost:3000/test', 
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: '47' }
    });
    naverLogin.init();
    window.location.href.includes("access_token");
    const location = window.location.href.split('=')[1];
    const sns_auth = location.split("&")[0];

    naverLogin.getLoginStatus(async function(status){
      console.log('ssss')
    })
  };
  useEffect(()=>{
    initializeNaverLogin();
    
  })
  return(
    <>
      <p>컴포넌트 경로 : src/comp/Test.js</p>
      <hr/>
      <p>모듈 추가시 꼭 --save를 붙혀주세요.</p>
      <p>예시: npm install react-redux --save (yarn 사용시 yarn add react-redux --save)</p>
      <p>페이지 추가시 App.js에서 Test 컴포넌트 있는 부분 보시고 추가하시면 됩니당 잘 안되면 문의</p>
      <p>그 외에는 마음대로 작업하세용 다 지워도댐 ㄱㄱㄱ</p>
    </>
  )
}
export default Test;
