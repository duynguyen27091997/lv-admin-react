import React, {useEffect, useState} from 'react';
import {AxiosUsBe} from "../utils/axios";
import {Table} from "react-bootstrap";
import {toDateString} from "../helpers/helpers";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


const ListCourses = () => {
    const [list, setList] = useState([])
    const user = useSelector(state => state.main.user);
    useEffect(_ => {
        AxiosUsBe.get('api/course')
            .then(({data: res}) => {
                if (res.success) {
                    setList(res.data);
                }
            })
            .catch(err => {
                setList([]);
            })
    }, [])
    return (
        <div className={'content edit-content'}>
            <div className={'box'}>
                <h1 className={'title'}>Danh sách <i className="las la-angle-right"/>Danh sách khoá học</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên khoá học</th>
                        <th>Ngôn ngữ lập trình</th>
                        <th>Ngày tạo</th>
                        <th>Người tạo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        list.map(course => <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course['LanguageChallenges'][0]['title']}</td>
                            <td>{toDateString(course.createdAt)}</td>
                            {
                                user.id === course.authorId ?
                                    <td><Link to={`/manage-contents/${course.id}`} className={'text-info'}>Của tôi</Link></td>
                                    :
                                    <td>{}</td>
                            }

                        </tr>)
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ListCourses;