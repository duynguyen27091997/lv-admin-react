import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, Form, Modal, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Editor from "../editor/Editor";
import useForm from "../../helpers/userForm";
import {AxiosUsBe} from "../../utils/axios";
import qs from 'querystring';
import {useSelector} from "react-redux";
import swal from "sweetalert";

const ModalCreateAssessment = forwardRef(({course, level = 1,number=1,add}, ref) => {
    const user = useSelector(state=>state.main.user);
    const [show, setShow] = useState(false);
    const [code, setCode] = useState(``);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const stateSchema = {
        kindChallengeId: 0,
        title: '',
        questionSen: '',
        tutorial: '',
        result: ''
    };

    const validate = () => {
        let errors = {};
        //validate email
        if (!values.kindChallengeId)
            errors.kindChallengeId = 'Bắt buộc chọn loại câu hỏi !';

        if (!values.title)
            errors.title = 'Tiêu đề không được để trống !';

        if (!values.questionSen)
            errors.questionSen = 'Câu hỏi không được để trống !';
        //validate password
        if (!values.result)
            errors.result = 'Kết qủa không được để trống !';

        return errors;
    }

    const submit = () => {

        let payload = {
            levelId: level,
            kindChallengeId: values.kindChallengeId,
            title: values.title,
            sequenceNumber: number,
            keyOnlyAssessment:1,
            questionSen: values.questionSen,
            tutorial: values.tutorial,
            result: values.result,
            courseId: course.id,
            languageId: course['LanguageChallenges'][0]['id'],
            authorId: user.id,
            code: `${code}`
        }
        AxiosUsBe.post('/api/quiz', qs.stringify(payload))
            .then(({data:res}) => {
                handleClose();
                // add(res.data.data)
                resetForm();
                swal({
                    title: 'Tạo bài tập thành công !',
                    icon: 'success',
                    button: false,
                    timer: 1500
                }).then(r => r)

            })
            .catch(err => {
                handleClose()
                swal({
                    title: 'Có lỗi xảy ra trong quá trình xử lí !',
                    icon: 'error',
                    button: false,
                    timer: 1500
                }).then(r => r)
            })

    }

    const {handleChange, handleSubmit, values, errors,resetForm} = useForm(stateSchema, submit, validate);

    useImperativeHandle(ref, () => {
        return {
            show: handleShow
        };
    });


    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1 className={'title'}>Tạo Câu hỏi</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Tiêu đề</Form.Label>
                                    <Form.Control placeholder="Nhập tiêu đề ..." name={'title'} value={values.title}
                                                  onChange={handleChange}/>
                                    {
                                        errors['title'] ? <Form.Text className="error">
                                            {errors['title']}
                                        </Form.Text> : null
                                    }
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Bài</Form.Label>
                                    <Form.Control value={level} disabled={true}/>
                                </Col>
                                <Col>
                                    <Form.Label>Loại câu hỏi</Form.Label>
                                    <Form.Control name={'kindChallengeId'} as="select"
                                                  value={values.kindChallengeId}
                                                  onChange={handleChange}>
                                        <option value={0} disabled={true}>Chọn loại câu hỏi...</option>
                                        <option value={1}>Chọn đáp án đúng</option>
                                        <option value={2}>Viết code đúng</option>
                                    </Form.Control>
                                    {
                                        errors['kindChallengeId'] ? <Form.Text className="error">
                                            {errors['kindChallengeId']}
                                        </Form.Text> : null
                                    }
                                </Col>
                            </Form.Row>
                            <Form.Row className={'mt-2'}>
                                <Col>
                                    <Form.Label>Câu hỏi </Form.Label>
                                    <Form.Control name={'questionSen'} rows={3} as={'textarea'}
                                                  value={values.questionSen}
                                                  placeholder="Nhập câu hỏi ..." onChange={handleChange}/>
                                    {
                                        errors['questionSen'] ? <Form.Text className="error">
                                            {errors['questionSen']}
                                        </Form.Text> : null
                                    }
                                </Col>
                            </Form.Row>

                            <Form.Row className={'mt-2'}>
                                <Col>
                                    <Form.Label>Hướng dẫn</Form.Label>
                                    <Form.Control name={'tutorial'} rows={5} as={'textarea'}
                                                  value={values.tutorial}
                                                  placeholder="Nhập hướng dẫn ..." onChange={handleChange}/>
                                    {
                                        errors['tutorial'] ? <Form.Text className="error">
                                            {errors['tutorial']}
                                        </Form.Text> : null
                                    }
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                    <Col sm={6}>
                        <Editor type={course['LanguageChallenges'][0]['title']} change={(code) =>setCode(`${code}`)}/>
                        <Form.Row className={'mt-2'}>
                            <Col>
                                <Form.Label>Kết quả</Form.Label>
                                <Form.Control name={'result'} value={values.result} placeholder="Nhập kết quả ..."
                                              onChange={handleChange}/>
                                {
                                    errors['result'] ? <Form.Text className="error">
                                        {errors['result']}
                                    </Form.Text> : null
                                }
                            </Col>
                        </Form.Row>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col sm={{span: 4}}>
                        <Button onClick={handleSubmit} variant={'success'} block={true}>Tạo</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
});

export default ModalCreateAssessment;