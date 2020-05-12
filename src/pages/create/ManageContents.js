import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";

import {AxiosUsBe} from "../../utils/axios";
import {toDateString} from "../../helpers/helpers";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const ManageContents = () => {
    const auth = useSelector(state => state.main.user);
    const [list, setList] = useState([])
    useEffect(_ => {
        AxiosUsBe.get(`/api/course-by-user/${auth.id}`)
            .then(({data: res}) => {
                if (res.success) {
                    setList(res.data);
                }
            })
            .catch(err => {
                setList([]);
            })
    }, [auth.id])

    return (
        <div className={'content edit-content'}>
            <div className={'box'}>
                <h1 className={'title'}>Quản lí khoá học <i className="las la-angle-right"/> Quản lí nội dung</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên khoá học</th>
                        <th>Ngôn ngữ lập trình</th>
                        <th>Ngày tạo</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        list.map(course => <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course['LanguageChallenges'][0]['title']}</td>
                            <td>{toDateString(course.createdAt)}</td>
                            <td>
                                <div><Link variant={'info'} size={"sm"} to={`/manage-contents/${course.id}`}><i
                                    className="las la-edit"/>Chỉnh sửa</Link>
                                </div>
                            </td>
                        </tr>)
                    }
                    </tbody>
                </Table>
            </div>
        </div>

    );
};

export default ManageContents;