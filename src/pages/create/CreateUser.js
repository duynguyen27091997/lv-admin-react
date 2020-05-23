import React, {useState} from 'react';
import {Alert, Button, Col, Container, Form} from "react-bootstrap";
import useForm from "../../helpers/userForm";
import {useDispatch, useSelector} from "react-redux";
import {createUser} from "../../actions/rootAction";
import errorImg from '../../assets/img/interface.png'
import swal from "sweetalert";

const CreateUser = () => {
    let auth = useSelector(state => state.main.user);

    const stateSchema = {
        roleId: 0,
        email: '',
        name: '',
        password: '',
        rePassword: ''
    };
    let [resErr, setResErr] = useState('');
    const {handleChange, handleSubmit, values, errors, resetForm} = useForm(stateSchema, submit, validate);
    const dispatch = useDispatch();

    function validate() {
        let errors = {};
        //validate email
        if (!values.roleId)
            errors.roleId = 'Bắt buộc chọn loại tài khoản !';
        if (!values.email)
            errors.email = 'Email không được để trống !';
        else if (!/^.+@.+\..+$/.test(values.email))
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
            {
                (auth.roleId === 1) ?
                    <div className={'box'}>
                        <h4 className={'title mb-4'}>Quản trị <i className="las la-angle-right"/>  Thêm thành viên</h4>
                        <Container className={'mt-5'} fluid={true}>
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
                                    <Form.Control name={'name'} placeholder="Nhập tên ..." type="text"
                                                  value={values.name}
                                                  onChange={handleChange}/>
                                    {
                                        errors['name'] ? <Form.Text className="error">
                                            {errors['name']}
                                        </Form.Text> : null
                                    }
                                </Col>
                                <Col>
                                    <Form.Control name={'email'} placeholder="Nhập email ..." type="email"
                                                  value={values.email}
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
                                    <Button variant="success" onClick={handleSubmit} block={true}><i
                                        className="las la-plus"/>Thêm
                                        thành viên</Button>
                                </Col>
                            </Form.Row>
                        </Container>
                    </div>
                    :
                    <div className={'box p-4 text-center'}>
                        <img width={100} src={errorImg} alt=""/>
                    <h4 className={'text-danger mt-4'}>Chỉ quản trị viên mới sử dụng được chức năng này !</h4>
                    </div>
            }
        </div>
    );
};

export default CreateUser;