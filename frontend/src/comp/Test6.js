import axios from 'axios';
import React, {useState, useEffect} from 'react';
import '../css/test6.css';
import Chart from "react-google-charts";


function Test6() {

    return(
    <div className="viewOutWrap">
        <div>
            <div className="project-title">
                <h1>프로젝트 이름</h1>
            </div>
            <div className="project-progress-bar">
                <h3>프로젝트 개요</h3>
            </div>
            <div className={'chartLine'}>
                <div className={'chartLine-child-1'}>
                    <Chart
                        width={'640px'}
                        height={'500px'}
                        chartType="PieChart"
                        loader={<div>로딩중...</div>}
                        data={[
                            ['Task','Hours per Day'],
                            ['Work', 11],
                            ['Eat', 4],
                            ['Commute', 2],
                            ['Watch TV', 2],
                            ['Sleep', 7],
                        ]}
                        options={{
                            title: 'My Daily Activities',
                            // is3D: true,

                            //추가 옵션은 여기로!!
                        }}
                        rootProps={{ 'data-testid' : '1'}}
                    />
                </div>
                <div className={'chartLine-child-2'}>
                    <Chart
                        width={'640px'}
                        height={'500px'}
                        chartType="PieChart"
                        data={[
                            ['Task','Hours per Day'],
                            ['Work', 11],
                            ['Eat', 8],
                            ['Commute', 4],
                            ['Watch TV', 5],
                            ['Sleep', 2],
                        ]}
                        options={{
                            title: 'My Daily Activities',
                            is3D: true,

                            //추가 옵션은 여기로!!
                        }}
                        rootProps={{ 'data-testid' : '2'}}
                    />
                </div>
                <div className={'chartLine-child-3'}>
                    <Chart
                        width={'640px'}
                        height={'500px'}
                        chartType="PieChart"
                        data={[
                            ['Task','Hours per Day'],
                            ['Work', 11],
                            ['Eat', 8],
                            ['Commute', 4],
                            ['Watch TV', 5],
                            ['Sleep', 2],
                        ]}
                        options={{
                            title: 'My Daily Activities',
                            pieHole: 0.4,

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