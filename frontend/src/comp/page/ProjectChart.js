import axios from "axios";
import React, { useEffect, useState,useRef,useCallback } from "react"
import {pub, colors, pages, host, seqColorTrans} from '../Helper.js'
import DatePicker from '../DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";


import { FileIcon, defaultStyles } from "react-file-icon";






function ProjectChart(p){
    const history = useHistory();

    return(
        <div className="projectChartWrap pageContentWrap">
            <div className="pageBtnWrap">
                <p className="pageBtn" onClick={()=>{
                    p.dispatch({type:'pagePush', val:'calendar'})
                    history.push('/project/'+p.prjSeq+'/calendar')
                }}>캘린더</p>
                <p className="pageBtn" onClick={()=>{
                    p.dispatch({type:'pagePush', val:'notice'})
                    history.push('/project/'+p.prjSeq+'/notice')
                }}>타임라인</p>
                <p className="pageBtn on" style={{color:p.prjColor,borderColor:p.prjColor}}  onClick={()=>{
                    p.dispatch({type:'pagePush', val:'projectChart'})
                    history.push('/project/'+p.prjSeq+'/projectChart')
                }}>프로젝트개요</p>
                <p className="pageBtn" onClick={()=>{
                    p.dispatch({type:'pagePush', val:'fileList'})
                    history.push('/project/'+p.prjSeq+'/fileList')
                }}>파일보관함</p>
            </div>

        </div>
    )
}



function transReducer(state){
    return {
        loading : state.loading,
        datePickerModal : state.datePickerModal,
        projectInfo : state.projectInfo,
        pageInfo : state.pageInfo,
        myMemberInfo : state.myMemberInfo,
    }
}

export default connect(transReducer)(ProjectChart);