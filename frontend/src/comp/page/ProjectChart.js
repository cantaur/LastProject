import axios from "axios";
import React, { useEffect, useState,useRef,useCallback } from "react"
import {pub, colors, pages, host, seqColorTrans} from '../Helper.js'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
// import '../../css/test6.css';
import ChartHead from './comp/ChartHead.js'

import Chart from "react-google-charts";
import data from "bootstrap/js/src/dom/data";
import { InputGroup } from "react-bootstrap";
import CircularProgress from '@mui/material/CircularProgress';



function ProjectChart(p) {

    //첫번째 차트 데이터
    const [countMilestone, setCountMilestone] = useState([]);
    //두번째 차트 데이터
    const [countTaskChart, setCountTaskChart] = useState([]);
    //세번째 차트 데이터
    const [countTask, setCountTask] = useState([]);
    //네번째 차트 데이터
    const [countMyTask,setCountMyTask] = useState([]);

    // const prjSeq = p.projectInfo.project_seq;
    // const prjMSeq = p.memberList[0].projmember_seq;
    // const MSeq = p.projectInfo.member_seq;
    console.log(p.myMemberInfo.projmember_seq)
    const history = useHistory();

    const countAllMyTaskGetFunc = () =>{
      axios.get(host +'/ajax/countAllMyTask/'+p.projectInfo.project_seq)
      .then(r=>{
        let countMyTaskDummy = [['','배정된 업무','완료']];
        r.data.map(row=>{
          let name = '';
          p.memberList.map(member=>{
            if(row.projmember_seq == member.projmember_seq){
              name = member.projmember_name?member.projmember_name:'#'+member.projmember_seq;
            }
          })
          let done = Number(row.done);
          let total = Number(row.total);
          countMyTaskDummy.push([name, total, done])
        })
        setCountMyTask(countMyTaskDummy)
      })
      .catch(e=>{
        console.log(e)
      })
    }

    const mileStoneOneChartGetFunc = () =>{
      axios.get(host + '/ajax/milestoneOneChart/' + p.projectInfo.project_seq)
      .then(r=>{
        setCountMilestone(r.data)
      })
      .catch(e=>{
        console.log(e)
      })
    }
    const taskChartGetFunc = () =>{
      axios.get(host + '/ajax/taskChart/' + p.projectInfo.project_seq + '/' + p.myMemberInfo.projmember_seq + '/' + p.projectInfo.member_seq)
      .then(r=>{
        setCountTaskChart(r.data);
      })
      .catch(e=>{
        console.log(e)
      })
    }

    const countTaskStatusGetFunc = () =>{
      axios.get(host + '/ajax/countTaskStatus/' + p.projectInfo.project_seq)
      .then(r=>{
        setCountTask(r.data);
      })
      .catch(e=>{
        console.log(e)
      })
    }

    useEffect(()=>{
      countAllMyTaskGetFunc();
      mileStoneOneChartGetFunc();
      taskChartGetFunc();
      countTaskStatusGetFunc();
    },[p.memberList])




    // useEffect(() => {
    //     axios
    //         .all([
    //             axios.get(host + '/ajax/milestoneOneChart/' + prjSeq),
    //             axios.get(host + '/ajax/taskChart/' + prjSeq + '/' + prjMSeq + '/' + MSeq),
    //             axios.get(host + '/ajax/countTaskStatus/' + prjSeq),
    //             axios.get(host +'/ajax/countAllMyTask/'+ prjSeq),
    //         ])
    //         .then(
    //             axios.spread((r1, r2, r3, r4) => {
    //                 c(r1.data);
    //                 setCountTaskChart(r2.data);
    //                 setCountTask(r3.data);
    //                 setCountMyTask(r4.data);
    //             }),
    //             setMemberTasks([
    //                 ['', '전체 업무', '완료된 업무'],
    //                 countMyTask.map(r=>{
    //                     memberTasks.push([{
    //                         projmember_seq : r.projmember_seq,
    //                         total: r.total,
    //                         done: r.done
    //                     }]);
    //                 })
    //             ]),
    //         )
    //         .catch(e => {
    //             console.log(e)
    //         });
    // }, []);

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
                    <div className={'chartLine-child-4'} style={{width:'100%'}}>
                      {
                        p.memberList
                        ?
                          countMyTask.length > 0
                          ?
                            <Chart
                                width={'100%'}
                                height={'300px'}
                                chartType="Bar"
                                loader={<div>로딩중...</div>}
                                data={countMyTask}
                                options={{
                                    chart:{
                                        title: '프로젝트 어벤져스',
                                    },
                                    bars: 'vertical', // 'vertical' 'horizontal'
                                }}
                                rootProps={{'data-testid':'1'}}
                            />
                          :<CircularProgress />
                        :<CircularProgress />
                      }

                    </div>
                    {/*다섯번째 차트*/}
                    {/* <div className={'chartLine-child-5'}>
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
                    </div> */}
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
