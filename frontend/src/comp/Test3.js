
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {pub, host} from './Helper.js'
import '../css/test.css';

function Test3(){
  useEffect(()=>{
    
  },[])
  let [uploadData, uploadDataCng] = useState({file:''})
  return(
    <>
      <input type="file" onChange={(e)=>{
        uploadDataCng({file:e.target.value})
        console.log(uploadData.file)

      }}/>
      <button onClick={()=>{
        if(uploadData.file != ''){
          axios.post('',{
            file:uploadData.file
          })
          .then(r=>{
            console.log(r)
            console.log('업로드성공')
          })
          .catch(e=>{
            console.log(e)
            console.log('업로드실패')
          })
        } else {

        }
        
      }}>파일 업로드</button>

    </>
  )
}
export default Test3;
