import React from 'react';
import {Bar} from "react-chartjs-2";

const CourseBox = ({data}) => {
    const {courses} = data;
    const listLanguage = new Set()
    courses.forEach(value => {
        listLanguage.add(value['LanguageChallenges'][0]['title'])
    })
    let arrCount = {};
    Array.from(listLanguage).forEach(name => {

        arrCount[name] = courses.filter(course => course['LanguageChallenges'][0]['title'] === name).length
    })
    const arr = {
        labels: ['Javascript', 'Php', 'C', 'C++', 'Java', 'Passcal'],
        datasets: [
            {
                barThickness:40,
                label: 'Khoá học',
                backgroundColor: '#8e44ad',
                data: [arrCount['javascript'] || 0, arrCount['php'] || 0, arrCount['c'] || 0, arrCount['c++'] || 0, arrCount['java'] || 0, arrCount['pascal'] || 0]
            }
        ]
    };
    return (
        <div>
            <h1 className={'title mb-0'}>Thống kê khoá học</h1>
            <Bar options={{
                scales: {
                    yAxes: [{
                        ticks: {
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }]
                }
            }} data={arr}/>
        </div>
    );
};

export default CourseBox;