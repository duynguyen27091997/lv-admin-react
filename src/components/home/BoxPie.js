import React from 'react';
import {Pie} from "react-chartjs-2";

const BoxPie = ({data}) => {
    const content = {
        datasets: [{
            data: [data.admins,data.users,data.members],
            backgroundColor: [
                '#16a085',
                '#f39c12',
                '#e74c3c'
            ]
        }],
        labels: [
            'Admin',
            'User',
            'Coder'
        ],
    };
    return (
        <div>
            <h1 className={'title mb-0'}>Thống kê thành viên</h1>
            <Pie options={{legend:{position:'bottom'}}}  data={content}/>
        </div>
    );
};

export default BoxPie;