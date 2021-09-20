
import React, {useState, useEffect} from 'react';

function ErrPage(){
  return(
    <>
      <p>오류가 발생하였습니다.</p>

      로그인시
      <p>메인화면으로이동</p>
      비로그인시
      <p>로그인화면으로이동</p>
    </>
  )
}
export default ErrPage;
