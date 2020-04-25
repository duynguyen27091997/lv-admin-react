import React from 'react';

import './login.scss';
import {Button, Form} from "react-bootstrap";
import validate from "../validate/validateLogin";
import useForm from "../helpers/userForm";

const Login = () => {
    const stateSchema = {
        email: '',
        password: ''
    };
    const {handleChange, handleSubmit, values, errors} = useForm(stateSchema, submit, validate);

    function submit() {
        console.log('submit');
    }

    return (
        <div className={'login'}>
            <div className="login__form">
                <Form className={'px-4 py-5'}>
                    <Form.Group>
                        <h1 className={'text-center text-uppercase mb-0'}>Đăng nhập</h1>
                        <h4 className={'text-center mb-5'}>
                            Chào mừng đến với codetree
                        </h4>
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control name={'name'} type="text" placeholder="admin" onChange={handleChange} value={values.name}/>
                        {
                            errors['name'] ? <Form.Text className="error">
                                {errors['name']}
                            </Form.Text> : null
                        }
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control name={'password'} type="password" placeholder="123456@" onChange={handleChange} value={values.password}/>
                        {
                            errors['password'] ? <Form.Text className="error">
                                {errors['password']}
                            </Form.Text> : null
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Check style={{fontSize: '15px'}} className={'text-muted'} type="checkbox"
                                    label="Nhớ tài khoản"/>
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="success" type="submit" block={true}>
                        Đăng nhập
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;