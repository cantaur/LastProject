
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

function ErrPage(){
  return(
    <>
      <p>오류가 발생하였습니다.</p>
      <Link to="/">메인으로</Link>
    </>
  )
}
export default ErrPage;
