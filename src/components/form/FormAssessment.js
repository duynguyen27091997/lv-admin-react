import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import qs from 'querystring';
import useForm from "../../helpers/userForm";
import {useSelector} from "react-redux";
import {AxiosUsBe} from "../../utils/axios";
import swal from "sweetalert";
import {toDateString, toSeconds} from "../../helpers/helpers";
import ModalCreateAssessment from "../modal/ModalCreateAssessment";
import InputMask from 'react-input-mask';

const FormAssessment = ({course, quizzes}) => {
    const user = useSelector(state => state.main.user);
    const [quizAdd, setQuizAdd] = useState(0);
    const [test, setTest] = useState(null);
    const [listTest, setListTest] = useState([]);
    const [listQuiz, setListQuiz] = useState([]);
    const [listQuizAdd, setListQuizAdd] = useState([]);
    const refModalTest = useRef(null);

    const stateSchema = {
        name: '',
        description: '',
        duration: ''
    };

    function validate(values) {
        let errors = {};
        //validate name
        if (!values.name)
            errors.name = 'Tên đề thi không được để trống !';
        if (!toSeconds(values.duration)){
            errors.duration = 'Thời gian làm bài không được để trống !';
        }
        return errors;
    }

    function deleteQuiz(quiz) {
        swal({
            title: "Bạn có chắc muốn xoá câu hỏi khỏi bài kiểm tra ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(r => {
            if (r)
                AxiosUsBe.delete(`/api/assessment-quiz/${quiz.id}`)
                    .then(({data: res}) => {
                        if (res.success) {
                            swal({
                                title: "Xoá câu  thành công",
                                icon: "success",
                                buttons: false,
                                timer: 1500
                            }).then()
                            setListQuiz([...listQuiz.filter(item => item.id !== quiz.id)]);
                        }
                    })
                    .catch(err => {
                        swal({
                            title: "Xoá câu hỏi không thành công",
                            icon: "error",
                            buttons: false,
                            timer: 1500
                        }).then()
                    })
        })
    }

    useEffect(_ => {
        if (test && quizAdd)
            AxiosUsBe.post('/api/add-assessment', qs.stringify({quizId: quizAdd, assessmentId: test.id}))
                .then(({data: res}) => {
                    if (res.success) {
                        setListQuiz([...listQuiz, res.data])
                        setQuizAdd(0)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        // eslint-disable-next-line
    }, [quizAdd]);
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
        let seconds = toSeconds(values.duration);
        let payload = {
            courseId: course.id,
            authorId: user.id,
            name: values.name,
            description: values.description,
            duration: seconds,
            active: 1
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
                    setListTest([...listTest, res.data])
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
            AxiosUsBe.get(`/api/quiz-by-assessment/${test.id}`)
                .then(({data: res}) => {
                    if (res.success)
                        setListQuiz(res.data)
                    else
                        setListQuiz([])
                })
                .catch
                (err => {
                    setListQuiz([])
                })
        }
    }, [test])
    useEffect(_ => {
        if (listQuiz) {
            let listQuizId = listQuiz.map(quiz => quiz.id);
            setListQuizAdd(quizzes.filter(quiz => {
                return (!listQuizId.includes(quiz.id) && quiz.active);
            }))
        }
    }, [listQuiz, quizzes]);
    const {handleChange, handleSubmit, values, errors, resetForm} = useForm(stateSchema, submit, validate);

    const handleShowTest = () => {
        refModalTest.current.show()
    };

    const handleDelete = (e, assessment) => {
        swal({
            title: "Bạn có chắc muốn xoá khoá học",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(r => {
            if (r) {
                AxiosUsBe.delete(`/api/assessment/${assessment.id}`)
                    .then(({data: res}) => {
                        if (res.success) {
                            swal({
                                title: "Xoá khoá học thành công",
                                icon: "success",
                                buttons: false,
                                timer: 1500
                            }).then()
                            setListTest([...listTest.filter(item => item.id !== assessment.id)]);
                        } else {
                            swal({
                                title: "Có lỗi xảy ra !",
                                icon: "error",
                                buttons: false,
                                timer: 1500
                            }).then()
                        }
                    })
            }
        })
    }
    const handleActive = (e, assessment) => {
        e.preventDefault();
        let isTrueSet = e.target.value === 'true';
        let payload = {
            id: assessment.id,
            status: !isTrueSet,
            keyName: 'assessment'
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
                            let currentIndex = listTest.findIndex(item => item.id === assessment.id);
                            let newListUser = [...listTest];
                            newListUser[currentIndex].active = !isTrueSet;
                            setListTest(newListUser);
                        } else {
                            swal({
                                title: "Có lỗi xảy ra !",
                                icon: "error",
                                buttons: false,
                                timer: 1500
                            }).then()
                        }
                    })
            }
        })
    }
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
                                    listTest.map(test => <tr className={!test.active ? 'disabled' : undefined}
                                                             key={test.id}>
                                        <td>{test.id}</td>
                                        <td>{test.name}</td>
                                        <td>{test.description}</td>
                                        <td>{toDateString(test['createdAt'])}</td>
                                        <td className={'text-center'}>
                                            <div className={'d-flex justify-content-center align-items-center'}>
                                                <Form.Check onChange={(e) => handleActive(e, test)}
                                                            value={test.active}
                                                            checked={test.active} style={{fontSize: '15px'}}
                                                            className={'text-muted mr-3'} type="checkbox"/>
                                                {test.active ?
                                                    <Button className={'mr-3'} variant={'info'} size={"sm"}
                                                            onClick={() => setTest(test)}><i
                                                        className="las la-edit mr-0"/></Button>
                                                    :
                                                    <Button className={'mr-3'} variant={'info'} size={"sm"}
                                                            style={{opacity: .3}}><i
                                                        className="las la-edit mr-0"/></Button>
                                                }
                                                <Button
                                                    onClick={(e) => handleDelete(e, test)}
                                                    variant={'danger p-1'} size={'sm'}><i
                                                    style={{fontSize: '18px', verticalAlign: 'middle'}}
                                                    className="lar la-trash-alt mr-0"/></Button>
                                            </div>
                                        </td>
                                    </tr>)
                                }

                                </tbody>
                            </Table></div> :
                            <h6 className={'py-4 text-center'}>Chưa có đề thi nào được tạo .</h6>
                        }
                        <Form>
                            <div className="border"/>
                            <Form.Row>
                                <h5 className={'titlethi mt-4'}>Tạo đề </h5>
                            </Form.Row>
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
                                    <InputMask placeholder={'00:00:00'} name={'duration'} className={'form-control'}
                                               mask="99:99:99" maskChar={null} value={values.duration}
                                               onChange={handleChange}/>
                                    {
                                        errors['duration'] ? <Form.Text className="error">
                                            {errors['duration']}
                                        </Form.Text> : null
                                    }
                                </Col>
                                <Col>
                                    <Button onClick={handleSubmit} variant="success" block={true}><i
                                        className="las la-plus"/>Tạo</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </div>
                    :
                    <div>
                        <ModalCreateAssessment add={quiz => setListQuiz([...listQuiz, quiz])} course={course}
                                               test={test} ref={refModalTest}/>
                        <Row>
                            <Col>
                                <div className={"object my-3"}>
                                    {
                                        listQuiz ? listQuiz.map(quiz => <div key={quiz.id}
                                                                             className={"d-inline-block assessment-quiz"}>
                                                <span>{quiz.title}</span>
                                                <i className="las la-times" onClick={() => deleteQuiz(quiz)}/></div>) :
                                            <p className={'text-center'}>Chưa có câu hỏi nào được tạo .</p>
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Chọn câu hỏi</Form.Label>
                                <Form.Control as="select" value={quizAdd} onChange={e => setQuizAdd(e.target.value)}>
                                    <option value={0} disabled={true}>Chọn câu hỏi ...</option>
                                    {
                                        listQuizAdd.map(quiz => <option key={quiz.id}
                                                                        value={quiz.id}>{quiz.title}</option>)
                                    }
                                </Form.Control>
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