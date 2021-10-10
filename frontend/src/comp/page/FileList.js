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






function FileList(p){
    const history = useHistory();

    return(
        <div className="fileListWrap pageContentWrap">
            <div className="pageBtnWrap">
                <p className="pageBtn" onClick={()=>{
                    p.dispatch({type:'pagePush', val:'calendar'})
                    history.push('/project/'+p.prjSeq+'/calendar')
                }}>캘린더</p>
                <p className="pageBtn" onClick={()=>{
                    p.dispatch({type:'pagePush', val:'timeLine'})
                    history.push('/project/'+p.prjSeq+'/timeLine')
                }}>타임라인</p>
                <p className="pageBtn" onClick={()=>{
                    p.dispatch({type:'pagePush', val:'projectChart'})
                    history.push('/project/'+p.prjSeq+'/projectChart')
                }}>프로젝트개요</p>
                <p className="pageBtn on" style={{color:p.prjColor,borderColor:p.prjColor}} onClick={()=>{
                    p.dispatch({type:'pagePush', val:'fileList'})
                    history.push('/project/'+p.prjSeq+'/fileList')
                }}>파일보관함</p>
            </div>
            <div className="fileListViewWrap">
                <div className="fileHeader">
                    <p className="w400">파일 이름</p>
                    <p className="file w200">파일 크기</p>
                    <p className="file w200">공유된 날짜</p>
                    <p className="file w200">공유한 사람</p>
                </div>

                <div className="fileList">
                    <div className="fileRow">
                        <p className="fileName">
                            <FileIcon extension="pdf" {...defaultStyles.pdf} />
                            <div className="fileInfo">
                                <p>파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.</p>
                                <div>마일스톤>Task1</div>
                            </div>

                        </p>

                        {/* 파일크기 */}
                        <p className="fileSize">100MB</p>
                        {/* 공유된 날짜 */}
                        <p className="fileDate">2021-10-06</p>
                        {/* 작성자 */}
                        <div className="uploader">
                            <div className="profileImg toolTipTopBox w200">
                                <p className="toolTip">이름</p>
                                <div>
                                    <img src={pub.img+"defaultProfile.svg"}/>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="fileRow">
                        <p className="fileName">
                            <FileIcon extension="jpg" {...defaultStyles.jpg} />
                            <div className="fileInfo">
                                <p>파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.</p>
                                <div>마일스톤>Task1</div>
                            </div>

                        </p>

                        {/* 파일크기 */}
                        <p className="fileSize">100MB</p>
                        {/* 공유된 날짜 */}
                        <p className="fileDate">2021-10-06</p>
                        {/* 작성자 */}
                        <div className="uploader">
                            <div className="profileImg toolTipTopBox w200">
                                <p className="toolTip">이름</p>
                                <div>
                                    <img src={pub.img+"defaultProfile.svg"}/>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="fileRow">
                        <p className="fileName">
                            <FileIcon extension="ai" {...defaultStyles.ai} />
                            <div className="fileInfo">
                                <p>파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.파일이름입니다.</p>
                                <div>마일스톤>Task1</div>
                            </div>

                        </p>

                        {/* 파일크기 */}
                        <p className="fileSize">100MB</p>
                        {/* 공유된 날짜 */}
                        <p className="fileDate">2021-10-06</p>
                        {/* 작성자 */}
                        <div className="uploader">
                            <div className="profileImg toolTipTopBox w200">
                                <p className="toolTip">이름</p>
                                <div>
                                    <img src={pub.img+"defaultProfile.svg"}/>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
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

export default connect(transReducer)(FileList);
