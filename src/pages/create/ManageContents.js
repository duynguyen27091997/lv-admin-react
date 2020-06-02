import React, {useEffect, useState} from 'react';
import {Button, Form, Table} from "react-bootstrap";

import { AxiosUsBe} from "../../utils/axios";
import {toDateString} from "../../helpers/helpers";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import swal from "sweetalert";
import qs from "querystring";

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
    const handleDelete = (e,course)=>{
        swal({
            title: "Bạn có chắc muốn xoá khoá học",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(r => {
            if (r) {
                AxiosUsBe.delete(`/api/course/${course.id}`)
                    .then(({data: res}) => {
                        if (res.success) {
                            swal({
                                title: "Xoá khoá học thành công",
                                icon: "success",
                                buttons: false,
                                timer: 1500
                            }).then()
                            setList([...list.filter(item => item.id !== course.id)]);
                        }
                    })
            }
        })
    }
    const handleActive = (e,course)=>{
        e.preventDefault();
        let isTrueSet = e.target.value === 'true';
        let payload = {
            id: course.id,
            status: !isTrueSet,
            keyName: 'course'
        }
        swal({
            title: "Bạn có chắc muốn thay đổi trạng thái khoá học",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(r => {
            if (r) {
                AxiosUsBe.put('/api/change-state-part', qs.stringify(payload))
                    .then(({data: res}) => {
                        if (res.success) {
                            swal({
                                title: "Thao tác thành công !",
                                icon: "success",
                                buttons: false,
                                timer: 1500
                            }).then()
                            let currentIndex = list.findIndex(item => item.id === course.id);
                            let newListUser = [...list];
                            newListUser[currentIndex].active = !isTrueSet;
                            setList(newListUser);
                        }
                    })
            }
        })
    }
    return (
        <div className={'content edit-content'}>
            <div className={'box'}>
                <h1 className={'title'}>Quản lí khoá học <i className="las la-angle-right"/> Khoá học của tôi</h1>
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
                        list.map(course => <tr className={!course.active ? 'disabled' : undefined} key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course['LanguageChallenges'][0]['title']}</td>
                            <td>{toDateString(course.createdAt)}</td>
                            <td>
                                <div className={'d-flex justify-content-center align-items-center'}>
                                    <Form.Check onChange={(e) => handleActive(e, course)}
                                                value={course.active}
                                                checked={course.active} style={{fontSize: '15px'}}
                                                className={'text-muted mr-3'} type="checkbox"/>
                                    {
                                        course.active ?
                                            <Link className={'button-manage mr-3'} size={"sm"} to={`/manage-contents/${course.id}`}><i
                                                className="las la-edit "/></Link>
                                            :
                                            <div className={'button-manage mr-3'} style={{opacity:.3}}><i
                                                className="las la-edit "/></div>
                                    }
                                    <Button onClick={(e) => handleDelete(e, course)}
                                            variant={'danger p-1'} size={'sm'}><i
                                        style={{fontSize: '18px', verticalAlign: 'middle'}}
                                        className="lar la-trash-alt mr-0"/></Button>
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