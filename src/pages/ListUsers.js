import React, {useEffect, useState} from 'react';
import { Button, Col, Container, Row, Table} from "react-bootstrap";
import { useSelector} from "react-redux";
import {AxiosAdBe} from "../utils/axios";
import {toDateString} from "../helpers/helpers";

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
    return (
        <div className={'content'}>
            <div className={'box'}>
                <h1 className={'title'}>Quản trị <i className="las la-angle-right"/>Danh sách người dùng</h1>
                <Container fluid={true}>
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
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    listUser.map(user => <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.roleId===1 ?"Quản trị viên" :"Người sử dụng"}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{toDateString(user['createdAt'])}</td>
                                        {

                                            ((parseInt(auth.roleId)===1 && parseInt(user.roleId)===2) || auth.supervisor) ?
                                                <td className={'text-center'}><Button variant={'info'} size={"sm"}><i
                                                    className="las la-edit"/>Chỉnh sửa</Button></td>
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