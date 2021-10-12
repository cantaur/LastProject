import axios from "axios";
import React, { useEffect, useState,useRef,useCallback } from "react"
import {pub, colors, pages, host, seqColorTrans} from '../Helper.js'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import '../../css/test6.css';
import ChartHead from './comp/ChartHead.js'

import Chart from "react-google-charts";
import data from "bootstrap/js/src/dom/data";


function ProjectChart(p) {

    //첫번째 차트 데이터
    const [countMilestone, setCountMilestone] = useState([]);
    //두번째 차트 데이터
    const [countTaskChart, setCountTaskChart] = useState([]);
    //세번째 차트 데이터
    const [countTask, setCountTask] = useState([]);
    //네번째 차트 데이터
    const [countMyTask,setCountMyTask] = useState([]);

    const prjTitle = p.projectInfo.project_title;
    const prjSeq = p.projectInfo.project_seq;
    const prjMSeq = p.memberList[0].projmember_seq;
    const MSeq = p.projectInfo.member_seq;
    const history = useHistory();
    const prjMySeq = p.memberList[0].projmember_seq

    console.log(p.projectInfo.project_title);
    console.log(p.projectInfo.project_seq);
    console.log(p.memberList[0].projmember_seq);
    console.log(p.memberList[0]);
    console.log(p.memberList[0].projmember_name);

    const memberListLoop = p.memberList.map((data)=>{
        console.log(data);
    });

    useEffect(() => {
        axios
            .all([
                axios.get(host + '/ajax/milestoneOneChart/' + prjSeq),
                axios.get(host + '/ajax/taskChart/' + prjSeq + '/' + prjMSeq + '/' + MSeq),
                axios.get(host + '/ajax/countTaskStatus/' + prjSeq),
                axios.get(host +'/ajax/countAllMyTask/'+ prjSeq + '/' + prjMySeq),
            ])
            .then(
                axios.spread((r1, r2, r3, r4) => {
                    setCountMilestone(r1.data);
                    setCountTaskChart(r2.data);
                    setCountTask(r3.data);
                    setCountMyTask(r4.data);
                    console.log("r4.data : "+r4.data);
                })
            )
            .catch(e => {
                console.log(e)
            });
    }, []);
    return (
        <div className="projectChartWrap pageContentWrap">
            <div className="pageBtnWrap">
                <p className="pageBtn" onClick={() => {
                    p.dispatch({type: 'pagePush', val: 'calendar'})
                    history.push('/project/' + p.prjSeq + '/calendar')
                }}>캘린더</p>
                <p className="pageBtn" onClick={() => {
                    p.dispatch({type: 'pagePush', val: 'timeLine'})
                    history.push('/project/' + p.prjSeq + '/timeLine')
                }}>타임라인</p>
                <p className="pageBtn on" style={{color: p.prjColor, borderColor: p.prjColor}} onClick={() => {
                    p.dispatch({type: 'pagePush', val: 'projectChart'})
                    history.push('/project/' + p.prjSeq + '/projectChart')
                }}>프로젝트개요</p>
                <p className="pageBtn" onClick={() => {
                    p.dispatch({type: 'pagePush', val: 'fileList'})
                    history.push('/project/' + p.prjSeq + '/fileList')
                }}>파일보관함</p>
            </div>
            <ChartHead/>
            <div>
                <div className="project-title">
                    <h1>{prjTitle}</h1>
                </div>
                <div className="project-progress-bar">
                    <h3>프로젝트 개요</h3>
                    <h6>프로그래스바</h6>
                </div>
                {/*첫번째 차트*/}
                <div className={'chartLine'}>
                    <div className={'chartLine-child-1'}>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>로딩중...</div>}
                            data={countMilestone[0] !== 0 && countMilestone[1] !== 0
                                ?
                                [
                                    ['Task', 'Hours per Day'],
                                    ['진행중인 마일스톤', countMilestone[0]],
                                    ['완료된 마일스톤', countMilestone[1]],
                                ]
                                : [
                                    ['Task', 'Hours per Day'],
                                    ['업무가 없습니다.', 1],
                                ]}
                            options={{
                                title: '마일스톤 진행도',
                                // is3D: true,
                                width: '100%',
                                // legend: 'none', //범례 컨트롤
                                chartArea: {
                                    left: 30,
                                    top: 100,
                                    width: '100%',
                                },
                                titleTextStyle: {
                                    fontSize: 25,
                                    bold: false
                                }
                                //추가 옵션은 여기로!!
                            }}
                            rootProps={{'data-testid': '1'}}
                        />
                    </div>
                    {/*두번째 차트*/}
                    <div className={'chartLine-child-2'}>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>로딩중...</div>}
                            data={countTaskChart[0] !== 0 && countTaskChart[1] !== 0
                                ?
                                [
                                    ['Task', 'Hours per Day'],
                                    ['전체 프로젝트 업무', countTaskChart[0]],
                                    ['나의 업무', countTaskChart[1]],
                                ]
                                : [
                                    ['Task', 'Hours per Day'],
                                    ['업무가 없습니다.', 1],
                                ]
                            }
                            options={{
                                title: '할당된 업무',
                                is3D: true,
                                // legend: 'none', //범례 컨트롤
                                width: '100%',
                                chartArea: {
                                    left: 30,
                                    top: 100,
                                    width: '100%',
                                },
                                titleTextStyle: {
                                    fontSize: 25,
                                    bold: false
                                }

                                //추가 옵션은 여기로!!
                            }}
                            rootProps={{'data-testid': '1'}}
                        />
                    </div>
                    {/*세번째 차트*/}
                    <div className={'chartLine-child-3'}>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>로딩중...</div>}
                            data={countTask[0] !== 0 && countTask[1] !== 0
                                ?
                                [
                                    ['Task', 'Hours per Day'],
                                    ['진행중인 업무', countTask[0]],
                                    ['완료된 업무', countTask[1]],
                                ]
                                :
                                [
                                    ['Task', 'Hours per Day'],
                                    ['업무가 없습니다.', 1],
                                ]
                            }
                            options={{
                                title: '현재 업무 진행도',
                                pieHole: 0.4,
                                width: '100%',
                                chartArea: {
                                    left: 30,
                                    top: 100,
                                    width: '100%',
                                },
                                titleTextStyle: {
                                    fontSize: 25,
                                    bold: false
                                }
                                // legend: 'none', //범례 컨트롤

                                //추가 옵션은 여기로!!
                            }}
                            rootProps={{'data-testid': '1'}}
                        />
                    </div>
                    {/*네번째 차트*/}
                    <div className={'chartLine-child-4'}>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="Bar"
                            loader={<div>로딩중...</div>}
                            data={
                                [
                                    ['', '전체 업무', '완료된 업무'], //차트 이름, 첫번째 막대 이름, 두번째 막대 이름
                                    [
                                        p.memberList[0].projmember_name, countMyTask[0], countMyTask[1]
                                    ]
                                ]
                            }
                            options={{
                                chart:{
                                    title: '프로젝트 어벤져스',
                                },
                                bars: 'horizontal', // 'vertical' 'horizontal'


                            }}

                            rootProps={{'data-testid':'1'}}
                        />
                    </div>
                    {/*다섯번째 차트*/}
                    <div className={'chartLine-child-5'}>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="Bar"
                            loader={<div>로딩중...</div>}
                            data={[
                                ['Year', 'Sales', 'Expenses', 'Profit'],
                                ['2014', 1000, 400, 200],
                                ['2015', 1170, 460, 250],
                                ['2016', 660, 1120, 300],
                                ['2017', 1030, 540, 350],

                            ]}
                            options={{
                                chart:{
                                    title: 'Company Performance',
                                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                                },
                            }}
                            rootProps={{'data-testid':'1'}}
                        />
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
        memberList : state.memberList,
    }
}

export default connect(transReducer)(ProjectChart);
