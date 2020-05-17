import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import {AxiosAdBe} from "../utils/axios";
import {toDateString} from "../helpers/helpers";
import swal from "sweetalert";
import qs from 'querystring';

const ListUsers = () => {
    let auth = useSelector(state => state.main.user);
    let [listUser, setListUser] = useState([]);
    useEffect(_ => {
        AxiosAdBe.get('/api/user')
            .then(({data: res}) => {
                setListUser(res.data)
            })
            .catch(err => {
                setListUser([])
            })
    }, []);
    const handleDelete = (e, user) => {
        swal({
            title: "Bạn có chắc muốn xoá user",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(r => {
            if (r) {
                AxiosAdBe.delete(`/api/user/${user.id}`)
                    .then(({data: res}) => {
                        if (res.success) {
                            swal({
                                title: "Xoá user thành công",
                                icon: "success",
                                buttons: false,
                                timer: 1500
                            }).then()
                            setListUser([...listUser.filter(item => item.id !== user.id)]);
                        }
                    })
            }
        })
    }
    const handleActive = (e, user) => {
        e.preventDefault();
        let isTrueSet = e.target.value === 'true';
        let payload = {
            userId: user.id,
            status: !isTrueSet,
            keyName: 'user'
        }
        swal({
            title: "Bạn có chắc muốn thay đổi thông tin user",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(r => {
            if (r) {
                AxiosAdBe.put('/api/change-status', qs.stringify(payload))
                    .then(({data: res}) => {
                        if (res.success) {
                            swal({
                                title: "Thao tác thành công !",
                                icon: "success",
                                buttons: false,
                                timer: 1500
                            }).then()
                            let currentIndex = listUser.findIndex(item => item.id === user.id);
                            let newListUser = [...listUser];
                            newListUser[currentIndex].active = !isTrueSet;
                            setListUser(newListUser);
                        }
                    })
            }
        })
    }
    return (
        <div className={'content'}>
            <div className={'box'}>
                <h1 className={'title'}>Quản trị <i className="las la-angle-right"/>Danh sách người dùng</h1>
                <Container fluid={true} className={'text-center'}>
                    <Row>
                        <Col>
                            <Table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Loại tài khoản</th>
                                    <th>Tên đăng nhập</th>
                                    <th>Email</th>
                                    <th>Ngày tạo</th>
                                    <th>Trang thái</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    listUser.map(user => <tr className={!user.active ? "disabled" : undefined}
                                                             key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.roleId === 1 ? "Quản trị viên" : "Người sử dụng"}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{toDateString(user['createdAt'])}</td>

                                        {

                                            (auth.roleId !== user.roleId) && ((parseInt(auth.roleId) === 1 && parseInt(user.roleId) === 2) || auth.supervisor) ?
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <Form.Check onChange={(e) => handleActive(e, user)}
                                                                    value={user.active}
                                                                    checked={user.active} style={{fontSize: '15px'}}
                                                                    className={'text-muted mr-3'} type="checkbox"/>
                                                        <Button onClick={(e) => handleDelete(e, user)}
                                                                variant={'danger p-1'} size={'sm'}><i
                                                            style={{fontSize: '18px', verticalAlign: 'middle'}}
                                                            className="lar la-trash-alt mr-0"/></Button>
                                                    </div>
                                                </td>
                                                :
                                                <td/>
                                        }
                                    </tr>)
                                }

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default ListUsers;