import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Chart } from "react-google-charts";
import {pub, host} from './Helper.js'
import {forEach} from "react-bootstrap/ElementChildren";

function Test7(){//For 간트차트
    const [milestones, setMilestones] = useState([]);
    const [tasks, setTasks] = useState([]);
    useEffect(()=>{
        axios
            .all([
                axios.get(host+'/ajax/1/milestonelist')//마일스톤 전부조회.
            ])
            .then(
                axios.spread((r1)=>{
                    setMilestones(r1.data);
                    console.log("#milestones:"+JSON.stringify(r1.data));
                })
            )
            .catch(e=>{
                console.log(e)
            });
    },[]);
    var arr=[[
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
    for(var i=0;i<milestones.length;i++){//데이터 arr에 마일스톤갯수만큼 반복을 돌려 입력
        arr.push([
            'Mile'+milestones[i].milestone_seq,
            milestones[i].milestone_title,
            'milestone',
            // new Date(2015, 1, 1),
            new Date(milestones[i].milestone_startdate),
            // new Date(2015, 1, 9),
            new Date(milestones[i].milestone_duedate),
            null,
            100,
            null
        ])
        axios.get(host+'/ajax/task/'+milestones[i].milestone_seq)
            .then(r=>
                // console.log("#tasks:"+JSON.stringify(r.data))
                setTasks(r.data)
            )
        // console.log("#tasks:"+tasks);//object
        // console.log("#tasks:"+JSON.stringify(tasks));

        // for(var j=0;j<3;j++){//해당 마일스톤의 업무개수만큼 반복을 돌려 입력
        //     arr.push([
        //         'Task'+i+j,
        //         j,
        //         'task',
        //         new Date(2015, 1, 1),
        //         new Date(2015, 1, 2),
        //         null,
        //         100,
        //         null
        //     ])
        // }
    }
    console.log(arr);
    return(
        <>
            <div className="app">
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="Gantt"
                    loader={<div>Loading Chart</div>}
                    // data={
                    //     [[
                    //         { type: 'string', label: 'Task ID' },
                    //         { type: 'string', label: 'Task Name' },//title(왼쪽에 들어갈 이름)
                    //         { type: 'string', label: 'resource' },
                    //         { type: 'date', label: 'Start Date' },//startdate
                    //         { type: 'date', label: 'End Date' }, //duedate
                    //         { type: 'number', label: 'Duration' },
                    //         { type: 'number', label: 'Percent Complete' },
                    //         { type: 'string', label: 'Dependencies' },
                    //     ],
                    //     [
                    //         'MileStone'+'1',//뒤에는 seq
                    //         '제목1',
                    //         'Milestone',//milestone인지 task인지..
                    //         new Date(2015, 1, 1),//startdate
                    //         new Date(2015, 1, 9),//duedate 입력하면 duration 없이 기간 표시가능
                    //         null,
                    //         100,
                    //         null,
                    //     ],
                    //     [
                    //         'Task'+'1',//뒤에는 seq
                    //         '제목2',
                    //         'Task',
                    //         new Date(2015, 1, 1),
                    //         new Date(2015, 1, 2),
                    //         null,
                    //         100,
                    //         null,
                    //     ],
                    //     [
                    //         'Task'+'2',//뒤에는 seq
                    //         '제목3',
                    //         'Task',
                    //         new Date(2015, 1, 2),
                    //         new Date(2015, 1, 4),
                    //         null,
                    //         100,
                    //         null,
                    //     ],
                    //     [
                    //         'Task'+'3',//뒤에는 seq
                    //         '제목4',
                    //         'Task',
                    //         new Date(2015, 1, 4),
                    //         new Date(2015, 1, 9),
                    //         null,
                    //         100,
                    //         null,
                    //     ],
                    //     [
                    //         'MileStone'+'2',
                    //         '제목2',
                    //         'Milestone',
                    //         new Date(2015, 1, 9),
                    //         new Date(2015, 1, 15),
                    //         null,
                    //         100,
                    //         null,
                    //     ],
                    //     [
                    //         'Task'+'4',
                    //         '제목5',
                    //         'Task',
                    //         new Date(2015, 1, 9),
                    //         new Date(2015, 1, 13),
                    //         null,
                    //         100,
                    //         null,
                    //     ],
                    //     [
                    //         'Task'+'5',
                    //         '제목6',
                    //         'Task',
                    //         new Date(2015, 1, 13),
                    //         new Date(2015, 1, 15),
                    //         null,
                    //         100,
                    //         null,
                    //     ],]
                    // }
                    data={arr} //OK
                    options={{
                     gantt:{
                         palette:[
                             {
                                 "color": "#5e97f6",//리소스분야의 text컬러
                                 "dark": "#2a56c6",//보이는 바 색상
                                 "light": "#FFFFFF" //눌린 후 바 색상
                             },
                             {
                                 "color": "#db4437",
                                 "dark": "#a52714",
                                 "light": "#f4c7c3"
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
                     },
                    }}
                    rootProps={{ 'data-testid': '3' }}
                />

            </div>
        </>
    );
}
export default Test7;