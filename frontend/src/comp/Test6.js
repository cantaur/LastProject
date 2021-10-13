import axios from 'axios';
import React, {useState, useEffect} from 'react';
// import '../css/test6.css';
import Chart from "react-google-charts";
import {host} from "./Helper";


function Test6() {

    const [countMilestone, setCountMilestone] = useState([]);
    const [countTaskChart, setCountTaskChart] = useState([]);
    const [countTask, setCountTask] = useState([]);

    const [prjSeq, setPrjSeq] = useState(2);  //얘네 어떻게받는걸까요...??
    const [prjMSeq, setPrjMSeq] = useState(1);  //얘네 어떻게받는걸까요...??
    const [MSeq, setMSeq] = useState(3);    //얘네 어떻게받는걸까요...??

useEffect(()=>{

   axios
       .all([
           axios.get(host+'/ajax/milestoneOneChart/'+prjSeq),
           axios.get(host+'/ajax/taskChart/'+prjSeq+'/'+prjMSeq+'/'+MSeq),
           axios.get(host+'/ajax/countTaskStatus/'+prjSeq),
       ])
       .then(
           axios.spread((r1,r2,r3)=>{
                setCountMilestone(r1.data);
                setCountTaskChart(r2.data);
                setCountTask(r3.data);
           })
       )
       .catch(e =>{
          console.log(e)
       });
}, []);

    return(
    <div className="viewOutWrap">
        <div>
            <div className="project-title">
                <h1>프로젝트 이름</h1>
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
                        data={countMilestone?[
                            ['Task','Hours per Day'],
                            ['진행중인 마일스톤', countMilestone[0]],
                            ['완료된 마일스톤', countMilestone[1]],
                        ]:[
                            ['Task','Hours per Day'],
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
                            titleTextStyle:{
                                fontSize: 25,
                                bold: false
                            }
                            //추가 옵션은 여기로!!
                        }}
                        rootProps={{ 'data-testid' : '1'}}
                    />
                </div>
                {/*두번째 차트*/}
                <div className={'chartLine-child-2'}>
                    <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>로딩중...</div>}
                        data={countTaskChart?[
                            ['Task','Hours per Day'],
                            ['전체 프로젝트 업무', countTaskChart[0]],
                            ['나의 업무', countTaskChart[1]],
                        ]
                            :[
                                ['Task','Hours per Day'],
                                ['업무가 없습니다.', 1],
                            ]
                        }
                        options={{
                            title: '할당된 업무',
                            is3D: true,
                            legend: 'none', //범례 컨트롤
                            width: '100%',
                            chartArea: {
                                left: 30,
                                top: 100,
                                width: '100%',
                            },
                            titleTextStyle:{
                                fontSize: 25,
                                bold: false
                            }

                            //추가 옵션은 여기로!!
                        }}
                        rootProps={{ 'data-testid' : '2'}}
                    />
                </div>
                {/*세번째 차트*/}
                <div className={'chartLine-child-3'}>
                    <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>로딩중...</div>}
                        data={countTask?[
                                ['Task','Hours per Day'],
                                ['진행중인 업무', countTask[0]],
                                ['완료된 업무', countTask[1]],
                        ]
                            :[
                                ['Task','Hours per Day'],
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
                            titleTextStyle:{
                                fontSize: 25,
                                bold: false
                            }
                            // legend: 'none', //범례 컨트롤

                            //추가 옵션은 여기로!!
                        }}
                        rootProps={{ 'data-testid' : '3'}}
                    />
                </div>
            </div>
        </div>
    </div>
    );
}

export default Test6;
