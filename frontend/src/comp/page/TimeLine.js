import axios from "axios";
import React, { useEffect, useState } from "react"
import {pub, colors, pages, host} from '../Helper.js'
import DatePicker from '../DatePicker.js'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import {Badge, Button, FloatingLabel, Form, Modal, Nav} from 'react-bootstrap';
import {Menu, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import ChartHead from "./comp/ChartHead";
import Chart from "react-google-charts";


function TimeLine(p){
    const [milestones, setMilestones] = useState([]);

    const history = useHistory();


    const [chartData, setChartData] = useState();

    let chartData2 = [
      {
        mile_seq : 3,
        mile_title :'마일스톤1',
        mile_content : '마일스톤내용',
        startdate : '2020-12-12',
        enddate : '2020-12-14',

        tasks:[
          {
            task_seq:12,
            task_title:'타이틀',
            task_contet:'내용',
            startdate : '2020-12-12',
            enddate : '2020-12-14',
            status: '0'
          },
        ]
      },
    ]

    useEffect(()=>{
      setMilestones(p.mileStoneList)



    },[p.mileStoneList]);

    var arr=[
      [
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },//title(왼쪽에 들어갈 이름)
        { type: 'string', label: 'resource' },
        { type: 'date', label: 'Start Date' },//startdate
        { type: 'date', label: 'End Date' }, //duedate
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
      ]
    ];
    for(var i=0;i<milestones.length;i++) {
        arr.push([
            'Mile'+milestones[i].milestone_seq,
            milestones[i].milestone_title,
            'milestone',
            new Date(milestones[i].milestone_startdate),
            new Date(milestones[i].milestone_duedate),
            100,
            100,
            null
        ])
        for(var j=0;j<2;j++){//test
            arr.push([
                'Task'+milestones[i].milestone_seq+j,
                'test',
                'task',
                new Date(milestones[i].milestone_startdate),
                new Date(milestones[i].milestone_duedate),
                100,
                100,
                null
            ])
        }
    }

    
    return(
        <div className="projectChartWrap pageContentWrap">
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

            <ChartHead progressHide={true}/>
            <div className="timeLineWrap" style={{marginTop:'30px'}}>
              <Chart
                width={'100%'}
                height={'400px'}
                chartType="Gantt"
                loader={<div>Loading Chart</div>}
                          
                data={[
                  [
                    { type: 'string', label: 'Task ID' },
                    { type: 'string', label: 'Task Name' },
                    { type: 'string', label: 'Resource' },
                    { type: 'date', label: 'Start Date' },
                    { type: 'date', label: 'End Date' },
                    { type: 'number', label: 'Duration' },
                    { type: 'number', label: 'Percent Complete' },
                    { type: 'string', label: 'Dependencies' },
                  ],
                  [
                    'Find',
                    'Find sources',
                    null,
                    new Date(2015, 0, 1),
                    new Date(2015, 0, 5),
                    null,
                    100,
                    null,
                  ],

                  [
                    'asdffff',
                    'Create bibliography',
                    'write',

                    new Date(2015, 0, 3),
                    new Date(2015, 0, 5),

                    null,
                    100,
                    'Find',
                  ],

                ]}
                rootProps={{ 'data-testid': '3' }}
              />
            </div>

            {
              false &&
              <div>
                <div className="viewOutWrap">
                    <div>
                        <div className="app">
                            <Chart
                                width={'100%'}
                                height={'400px'}
                                chartType="Gantt"
                                loader={<div>로딩중...</div>}
                                data={arr}
                                options={{
                                    heigth: 275,
                                    gantt: {
                                        palette:[
                                            {
                                                "color": "#f48fb1",//리소스text, 죄측text 컬러
                                                "dark": "#880e4f",//보이는 바 색상
                                                "light": "#d8cfea" //눌린 후 밝아지는 다른 바 색상
                                            },
                                            {
                                                "color": "#dcd8d0",
                                                "dark": "#00838f",
                                                "light": "#b2ebf2"
                                            },
                                            {
                                                "color": "#f2a600",
                                                "dark": "#ee8100",
                                                "light": "#fce8b2"
                                            },
                                            {
                                                "color": "#0f9d58",
                                                "dark": "#0b8043",
                                                "light": "#b7e1cd"
                                            },
                                            {
                                                "color": "#ab47bc",
                                                "dark": "#6a1b9a",
                                                "light": "#e1bee7"
                                            },
                                            {
                                                "color": "#dcd8d0",
                                                "dark": "#00838f",
                                                "light": "#b2ebf2"
                                            },
                                            {
                                                "color": "#ff7043",
                                                "dark": "#e64a19",
                                                "light": "#ffccbc"
                                            },
                                            {
                                                "color": "#9e9d24",
                                                "dark": "#827717",
                                                "light": "#f0f4c3"
                                            },
                                            {
                                                "color": "#fee8f4",
                                                "dark": "#3949ab",
                                                "light": "#c5cae9"
                                            },
                                            {
                                                "color": "#c0d6e4",
                                                "dark": "#e91e63",
                                                "light": "#f8bbd0"
                                            },
                                            {
                                                "color": "#e4cfea",
                                                "dark": "#004d40",
                                                "light": "#b2dfdb"
                                            },
                                            {
                                                "color": "#d8cfea",
                                                "dark": "#880e4f",
                                                "light": "#f48fb1"
                                            },
                                        ],
                                    }
                                    //추가 옵션은 여기로!!
                                }}
                                rootProps={{ 'data-testid' : '1'}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        
            }
          </div>
    );
}



function transReducer(state){
    return {
        datePickerModal : state.datePickerModal,
        loading : state.loading,
        projectInfo : state.projectInfo,
        pageInfo : state.pageInfo,
        myMemberInfo : state.myMemberInfo,
        memberList : state.memberList,
        mileStoneList:state.mileStoneList,
    }
}

export default connect(transReducer)(TimeLine)
