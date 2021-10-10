import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors, pages, host} from '../Helper.js'
import DatePicker from '../DatePicker.js'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import {Badge, Button, FloatingLabel, Form, Modal, Nav} from 'react-bootstrap';
import {Menu, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';



function TimeLine(p){
    const history = useHistory();
    return(
        <div className="timeLineWrap pageContentWrap">
            <div className="pageBtnWrap">
                <p className="pageBtn" onClick={()=>{
                    p.dispatch({type:'pagePush', val:'calendar'})
                    history.push('/project/'+p.prjSeq+'/calendar')
                }}>캘린더</p>
                <p className="pageBtn on" style={{color:p.prjColor,borderColor:p.prjColor}} onClick={()=>{
                    p.dispatch({type:'pagePush', val:'timeLine'})
                    history.push('/project/'+p.prjSeq+'/timeLine')
                }}>타임라인</p>
                <p className="pageBtn" onClick={()=>{
                    p.dispatch({type:'pagePush', val:'projectChart'})
                    history.push('/project/'+p.prjSeq+'/projectChart')
                }}>프로젝트개요</p>
                <p className="pageBtn" onClick={()=>{
                    p.dispatch({type:'pagePush', val:'fileList'})
                    history.push('/project/'+p.prjSeq+'/fileList')
                }}>파일보관함</p>
            </div>

            <p>타임라인 페이지 입니다.</p>
        </div>
    )
}



function transReducer(state){
    return {
        datePickerModal : state.datePickerModal,
    }
}

export default connect(transReducer)(TimeLine)
