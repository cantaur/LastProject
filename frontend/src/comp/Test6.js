import axios from 'axios';
import React, {useState, useEffect} from 'react';
import '../css/test6.css';
import Chart from "react-google-charts";
import {host} from "./Helper";


function Test6() {

    const [countMilestone, setCountMilestone] = useState([]);
    const [prjseq, setPrjseq] = useState(2);

useEffect(()=>{

   axios
       .all([
           axios.get(host+'/ajax/milestoneoneChart/'+prjseq),
       ])
       .then(

           axios.spread((r)=>{
               setCountMilestone(r.data);
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
                            ['진행', countMilestone[0]],
                            ['완료', countMilestone[1]],
                        ]:null}
                        options={{
                            title: '마일스톤',
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
                        data={[
                            ['Task','Hours per Day'],
                            ['Work', 11],
                        ]}
                        options={{
                            title: '나에게 생성된 업무',
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
                        data={[
                            ['Task','Hours per Day'],
                            ['Work', 11],
                            ['Eat', 8],
                            ['Commute', 4],
                            ['Watch TV', 5],
                            ['Sleep', 2],
                        ]}
                        options={{
                            title: '내가 생성한 업무',
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