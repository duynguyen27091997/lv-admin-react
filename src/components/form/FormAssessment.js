import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import qs from 'querystring';
import useForm from "../../helpers/userForm";
import {useSelector} from "react-redux";
import {AxiosUsBe} from "../../utils/axios";
import swal from "sweetalert";
import {toDateString} from "../../helpers/helpers";
import ModalCreateAssessment from "../modal/ModalCreateAssessment";

const FormAssessment = ({course}) => {
    const user = useSelector(state => state.main.user);
    const [test, setTest] = useState(null);
    const [listTest, setListTest] = useState([]);
    const [listQuiz, setListQuiz] = useState([]);

    const refModalTest = useRef(null);

    const stateSchema = {
        name: '',
        description: ''
    };

    function validate(values) {
        let errors = {};
        //validate name
        if (!values.name)
            errors.name = 'Tên đề thi không được để trống !';

        return errors;
    }

    useEffect(_ => {
        AxiosUsBe.get('/api/assessment')
            .then(({data: res}) => {
                if (res.success) {
                    setListTest(res.data)
                }
            })
            .catch(err => {
                setListTest([])
            })
    }, [])
    const submit = () => {
        let payload = {
            courseId: course.id,
            authorId: user.id,
            name: values.name,
            description: values.description
        }
        AxiosUsBe.post('/api/assessment', qs.stringify(payload))
            .then(({data: res}) => {
                if (res.success) {
                    swal({
                        title: 'Tạo đề thi thành công ',
                        icon: 'success',
                        timer: 1500,
                        button: false
                    }).then(r => r)
                    resetForm();
                } else {

                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(_ => {
        if (test) {
            AxiosUsBe.get(`/api/list-quiz-assessment?userId=${user.id}&courseId=${course.id}`)
                .then(({data: res}) => {
                    setListQuiz(res.data)
                })
                .catch
                (err => {
                    setListQuiz([])
                })
        }
    }, [test])
    const {handleChange, handleSubmit, values, errors, resetForm} = useForm(stateSchema, submit, validate);

    const handleShowTest = () => {
        refModalTest.current.show()
    };

    return (
        <div>
            {
                !test ?
                    <div>
                        {listTest.length ? <div className={'py-4'}><Table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên đề thi</th>
                                    <th>Mô tả</th>
                                    <th>Ngày tạo</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    listTest.map(test => <tr key={test.id}>
                                        <td>{test.id}</td>
                                        <td>{test.name}</td>
                                        <td>{test.description}</td>
                                        <td>{toDateString(test['createdAt'])}</td>
                                        <td className={'text-center'}><Button variant={'info'} size={"sm"}
                                                                              onClick={() => setTest(test)}><i
                                            className="las la-edit"/>Chỉnh sửa</Button></td>
                                    </tr>)
                                }

                                </tbody>
                            </Table></div> :
                            <h6 className={'py-4 text-center'}>Chưa có đề thi nào được tạo .</h6>
                        }
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Control name={'name'} placeholder="Nhập tên đề thi ..."
                                                  onChange={handleChange}
                                                  value={values.name}/>
                                    {
                                        errors['name'] ? <Form.Text className="error">
                                            {errors['name']}
                                        </Form.Text> : null
                                    }
                                </Col>
                                <Col>
                                    <Form.Control name={'description'}
                                                  placeholder="Nhập mô tả ..."
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
                    :
                    <div>
                        <ModalCreateAssessment add={quiz =>setListQuiz([...listQuiz,quiz])} course={course} test={test} ref={refModalTest}/>
                        <Row>
                            <Col>
                                <div className={"object my-3"}>
                                    {/*{*/}
                                    {/*    listQuiz.length ? listQuiz.map(quiz => <span key={quiz.id}>{quiz.title}</span>) : null*/}
                                    {/*}*/}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Chọn câu hỏi</Form.Label>
                                <Form.Control placeholder="Chọn câu hỏi ..." name={'title'}/>
                            </Col>
                            <Col>
                                <Form.Label>Tạo mới</Form.Label>
                                <div onClick={() => handleShowTest()} className={'object__create w-100 text-center'}><i
                                    className="las la-plus"/></div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={'mt-4'}>
                                <Button variant={'outline-secondary'} size={"sm"}
                                        onClick={() => setTest(null)}>Quay lại</Button>
                            </Col>
                        </Row>
                    </div>
            }
        </div>
    );
};

export default FormAssessment;