import React from 'react';
import {Button, Col, Form} from "react-bootstrap";
import FormLanguage from "../../components/form/FormLanguage";
import {useSelector} from "react-redux";
import qs from 'querystring';
import {AxiosUsBe} from "../../utils/axios";
import swal from "sweetalert";
import useForm from "../../helpers/userForm";

const CreateCourses = () => {

    const user = useSelector(state => state.main.user)

    const stateSchema = {
        languageId: 0,
        name: '',
        description: ''
    };

    function validate(values) {
        let errors = {};
        //validate name
        if (!values.languageId)
            errors.languageId = 'Vui lòng chọn ngôn ngữ !';

        //validate password
        if (!values.name)
            errors.name = 'Tên khoá học không được để trống !';

        return errors;
    }

    const {handleChange, handleSubmit, values, errors,resetForm} = useForm(stateSchema, submit, validate);

    function submit() {
        let data = {
            languageId: values.languageId,
            authorId: user.id,
            name: values.name,
            description: values.description
        }
        AxiosUsBe.post('/api/course', qs.stringify(data))
            .then(res => {
                if (res.data.success) {
                    swal({
                        title: 'Tạo khoá học thành công',
                        icon: 'success',
                        button: false,
                        timer: 1500
                    }).then(r => r)
                } else {
                    swal({
                        title: 'Tạo khoá học không thành công',
                        icon: 'error',
                        button: false,
                        timer: 1500
                    }).then(r => r)
                }
            })
            .catch(err => {
                swal({
                    title: 'Tạo khoá học không thành công',
                    icon: 'error',
                    button: false,
                    timer: 1500
                }).then(r => r)
            })
            .finally(_=>{
                resetForm()
            })
    }

    return (
        <div className={'content'}>
            <div className={'box'}>
                <h1 className={'title'}>Quản lí khoá học <i className="las la-angle-right"/>Tạo khoá học</h1>
                <Form>
                    <Form.Row>
                        <Col>
                            <FormLanguage onChange={handleChange}
                                          languageId={values.languageId}/>
                            {
                                errors['languageId'] ? <Form.Text className="error">
                                    {errors['languageId']}
                                </Form.Text> : null
                            }
                        </Col>
                        <Col>
                            <Form.Control name={'name'} placeholder="Nhập tên khoá học ..."
                                          onChange={handleChange}
                                          value={values.name}/>
                            {
                                errors['name'] ? <Form.Text className="error">
                                    {errors['name']}
                                </Form.Text> : null
                            }
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Control name={'description'} rows={5} as={'textarea'} placeholder="Nhập mô tả ..."
                                          onChange={handleChange}
                                          value={values.description}/>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Button onClick={handleSubmit} variant="success" block={true}><i
                                className="las la-plus"/>Tạo</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        </div>
    )
}

export default CreateCourses;