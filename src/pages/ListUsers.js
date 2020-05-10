import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import useForm from "../helpers/userForm";
import {useDispatch, useSelector} from "react-redux";
import swal from "sweetalert";
import {createUser} from "../actions/rootAction";
import {AxiosAdBe} from "../utils/axios";
import {toDateString} from "../helpers/helpers";

const ListUsers = () => {
    let auth = useSelector(state => state.main.user);
    let [resErr, setResErr] = useState('');
    let [listUser, setListUser] = useState([]);
    const stateSchema = {
        roleId: 0,
        email: '',
        name: '',
        password: '',
        rePassword: ''
    };
    useEffect(_ => {
        AxiosAdBe.get('/api/user')
            .then(({data: res}) => {
                setListUser(res.data)
            })
            .catch(err => {
                setListUser([])
            })
    }, []);
    const {handleChange, handleSubmit, values, errors, resetForm} = useForm(stateSchema, submit, validate);
    const dispatch = useDispatch();

    function validate() {
        let errors = {};
        //validate email
        if (!values.roleId)
            errors.roleId = 'Bắt buộc chọn loại tài khoản !';
        if (!values.email)
            errors.email = 'Email không được để trống !';
        else if (!/^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/.test(values.email))
            errors.email = 'Email không hợp lệ !';

        if (!values.name)
            errors.name = 'Tên tài khoản không được để trống !';
        else if (!/^[0-9a-zA-Z]*$/.test(values.name))
            errors.name = 'Tên tài khoản phải viết liền không dấu';
        //validate password
        if (!values.password)
            errors.password = 'Password không được để trống !';
        else if (values.password.length < 6)
            errors.password = 'Password không ít hơn 6 kí tự !';

        // eslint-disable-next-line no-self-compare
        if (values.rePassword !== values.password)
            errors.rePassword = 'Không trùng với mật khẩu';
        return errors;
    }

    function submit() {
        let params = {
            roleId: values.roleId,
            email: values.email,
            username: values.name,
            password: values.password,
        }
        dispatch(createUser(params))
            .then(({data: res}) => {
                if (res.success) {
                    swal({
                        title: res.message,
                        icon: "success",
                        button: false,
                        timer: 1500
                    }).then(r => r)
                    setListUser([...listUser,res.data])
                    resetForm();
                } else {
                    setResErr(res.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className={'content'}>
            <div className={'box'}>
                <h1 className={'title'}>Nội dung <i className="las la-angle-right"/>Danh sách người dùng</h1>
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
                {
                    (auth.roleId ===1) ?
                        <Container className={'mt-5'} fluid={true}>
                            <h4 className={'title mb-4'}>Nội dung <i className="las la-angle-right"/> Thêm thành viên</h4>
                            {resErr && <Alert variant="danger" onClose={() => setResErr('')} dismissible>
                                <span>{resErr}</span>
                            </Alert>}
                            <Form.Row>
                                <Col>
                                    <Form.Control name={'roleId'} as="select" placeholder={'Chọn loại tài khoản...'}
                                                  value={values.roleId}
                                                  onChange={handleChange}>
                                        <option value={0} disabled={true}>Chọn loại tài khoản...</option>
                                        <option value={1}>Quản trị viên</option>
                                        <option value={2}>Người sử dụng</option>
                                    </Form.Control>
                                    {
                                        errors['roleId'] ? <Form.Text className="error">
                                            {errors['roleId']}
                                        </Form.Text> : null
                                    }
                                </Col>
                                <Col>
                                    <Form.Control name={'name'} placeholder="Nhập tên ..." type="text" value={values.name}
                                                  onChange={handleChange}/>
                                    {
                                        errors['name'] ? <Form.Text className="error">
                                            {errors['name']}
                                        </Form.Text> : null
                                    }
                                </Col>
                                <Col>
                                    <Form.Control name={'email'} placeholder="Nhập email ..." type="email" value={values.email}
                                                  onChange={handleChange}/>
                                    {
                                        errors['email'] ? <Form.Text className="error">
                                            {errors['email']}
                                        </Form.Text> : null
                                    }
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Control name={'password'} placeholder="Nhập mật khẩu" type="password"
                                                  value={values.password} onChange={handleChange}/>
                                    {
                                        errors['password'] ? <Form.Text className="error">
                                            {errors['password']}
                                        </Form.Text> : null
                                    }
                                </Col>
                                <Col>
                                    <Form.Control name={'rePassword'} placeholder="Xác thực mật khẩu" type="password"
                                                  value={values.rePassword} onChange={handleChange}/>
                                    {
                                        errors['rePassword'] ? <Form.Text className="error">
                                            {errors['rePassword']}
                                        </Form.Text> : null
                                    }
                                </Col>
                                <Col>
                                    <Button variant="success" onClick={handleSubmit} block={true}><i className="las la-plus"/>Thêm
                                        thành viên</Button>
                                </Col>
                            </Form.Row>
                        </Container>
                        :
                        null
                }
            </div>
        </div>
    );
};

export default ListUsers;