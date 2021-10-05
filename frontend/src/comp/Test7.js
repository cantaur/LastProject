import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Chart } from "react-google-charts";
import MileStone from "./page/MileStone";

function Test7(){//For 간트차트(seq, name(title), startdate, duedate필요)
    return(
        <>
            <div className="app">
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="Gantt"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [
                            { type: 'string', label: 'Task ID' },
                            { type: 'string', label: 'Task Name' },//title(왼쪽에 들어갈 이름)
                            { type: 'string', label: 'resource' },
                            { type: 'date', label: 'Start Date' },//startdate
                            { type: 'date', label: 'End Date' }, //duedate
                            { type: 'number', label: 'Duration' },
                            { type: 'number', label: 'Percent Complete' },
                            { type: 'string', label: 'Dependencies' },
                        ],
                        [
                            'MileStone'+'1',//뒤에는 seq
                            '제목1',
                            'Milestone',//milestone인지 task인지..
                            new Date(2015, 1, 1),//startdate
                            new Date(2015, 1, 9),//duedate 입력하면 duration 없이 기간 표시가능
                            null,
                            100,
                            null,
                        ],
                        [
                            'Task'+'1',//뒤에는 seq
                            '제목2',
                            'Task',
                            new Date(2015, 1, 1),
                            new Date(2015, 1, 2),
                            null,
                            100,
                            null,
                        ],
                        [
                            'Task'+'2',//뒤에는 seq
                            '제목3',
                            'Task',
                            new Date(2015, 1, 2),
                            new Date(2015, 1, 4),
                            null,
                            100,
                            null,
                        ],
                        [
                            'Task'+'3',//뒤에는 seq
                            '제목4',
                            'Task',
                            new Date(2015, 1, 4),
                            new Date(2015, 1, 9),
                            null,
                            100,
                            null,
                        ],
                        [
                            'MileStone'+'2',
                            '제목2',
                            'Milestone',
                            new Date(2015, 1, 9),
                            new Date(2015, 1, 15),
                            null,
                            100,
                            null,
                        ],
                        [
                            'Task'+'4',
                            'Task',
                            new Date(2015, 1, 9),
                            new Date(2015, 1, 13),
                            null,
                            100,
                            null,
                        ],
                        [
                            'Task'+'5',
                            '제목6',
                            'Task',
                            new Date(2015, 1, 13),
                            new Date(2015, 1, 15),
                            null,
                            100,
                            null,
                        ],
                    ]}
                    rootProps={{ 'data-testid': '3' }}
                />
            </div>
        </>
    );
}
export default Test7;