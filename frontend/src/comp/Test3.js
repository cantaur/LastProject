
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {pub, host} from './Helper.js'
import '../css/test.css';

function Test3(){
  useEffect(()=>{
    
  },[])

  const [files, filesCng] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', files)

    axios({
      method:'post',
      url:'uploadFile',
      data:formData,
      headers: {"Content-Type": "multipart/form-data"}
    })
    .then(r=>{
      console.log(r)
      console.log('업로드성공')
    })
    .catch(e=>{
      console.log(e)
      console.log('업로드실패')
    })
  }

  const handleUpload = e => {
    e.preventDefault();
    const file = e.target.files[0];
    filesCng(file)
  };

  return(
    <>

      <input type="file" onChange={handleUpload}/>
      <button onClick={handleSubmit}>파일 업로드</button>

    </>
  )
}
export default Test3;
