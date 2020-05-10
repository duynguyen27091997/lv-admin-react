import React, {useEffect, useState} from 'react';
import swal from 'sweetalert';
import './login.scss';
import {Button, Form} from "react-bootstrap";
import validate from "../validate/validateLogin";
import useForm from "../helpers/userForm";
import {login} from "../actions/rootAction";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

const Login = () => {
    let [resErr, setResErr] = useState('');
    let [saveLogin, setSaveLogin] = useState(false);
    let user = useSelector(state => state.main.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const stateSchema = {
        username: '',
        password: ''
    };
    useEffect(_ => {
        if (Object.keys(user).length !== 0)
            history.push('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    const {handleChange, handleSubmit, values, errors} = useForm(stateSchema, submit, validate);

    function submit() {
        dispatch(login({username: values.username, password: values.password}))
            .then(({data: res}) => {
                try {
                    if (saveLogin){
                        let {token} = res.data.user;
                        localStorage.setItem('token', token)
                    }
                } catch (e) {
                    swal({
                        title: "Có lỗi xảy ra trong quá trình đăng nhập",
                        icon: "fail",
                        button: false,
                        timer: 1500
                    }).then(r => r)
                }
                if (res.success) {
                    swal({
                        title: res.message,
                        icon: "success",
                        button: false,
                        timer: 1500
                    }).then(r => r)
                    history.push('/')
                } else {
                    setResErr(res.message)
                }
            })
            .catch(err => {
                swal({
                    title: "Có lỗi xảy ra trong quá trình đăng nhập",
                    icon: "fail",
                    button: false,
                    timer: 1500
                }).then(r => r)
            })
    }

    return (
        <div className={'login'}>
            <div className="login__form">
                <Form className={'px-4 py-5'}>
                    <Form.Group>
                        <h1 style={{color: '#5d78ff'}} className={'text-center text-uppercase mb-0'}>Đăng nhập</h1>
                        <h4 className={'text-center mb-5'}>
                            Chào mừng đến với codetree
                        </h4>
                        {resErr && <div className="alert alert-danger" role="alert">
                            {resErr}
                        </div>}
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control name={'username'} type="text" placeholder="Tên đăng nhập ..."
                                      onChange={handleChange}
                                      value={values.username}/>
                        {
                            errors['username'] ? <Form.Text className="error">
                                {errors['username']}
                            </Form.Text> : null
                        }
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control name={'password'} type="password" placeholder="@mật khẩu ..."
                                      onChange={handleChange} value={values.password}/>
                        {
                            errors['password'] ? <Form.Text className="error">
                                {errors['password']}
                            </Form.Text> : null
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Check value={saveLogin} style={{fontSize: '15px'}} className={'text-muted'} type="checkbox" onChange={(e) => setSaveLogin(e.target.value)}
                                    label="Nhớ tài khoản"/>
                    </Form.Group>
                    <Button onClick={handleSubmit} style={{background: '#5d78ff'}} type="submit" block={true}>
                        Đăng nhập
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;