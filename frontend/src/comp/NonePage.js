
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

function NonePage(){
  return(
    <>
      <p>잘못된 접근입니다.</p>
      <Link to="/">메인으로</Link>
    </>
  )
}
export default NonePage;
