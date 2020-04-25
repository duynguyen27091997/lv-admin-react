import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, Form, Modal, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import EditorPhp from "../editor/EditorPhp";

const ModalCreateQuiz = forwardRef((props, ref) => {
    const [level, setLevel] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                                    <Form.Control placeholder="Nhập tiêu đề ..."/>
                                </Col>

                                <Col>
                                    <Form.Label>Level</Form.Label>
                                    <Form.Control as="select" placeholder={'Chọn level...'} value={level}
                                                  onChange={(e) => setLevel(e.target.value)}>
                                        <option value={0} disabled={true}>Chọn level...</option>
                                        <option>Javascript</option>
                                        <option>Php</option>
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row className={'mt-2'}>
                                <Col>
                                    <Form.Label>Câu hỏi </Form.Label>
                                    <Form.Control rows={3} as={'textarea'} placeholder="Nhập câu hỏi ..."/>
                                </Col>
                            </Form.Row>

                            <Form.Row className={'mt-2'}>
                                <Col>
                                    <Form.Label>Hướng dẫn</Form.Label>
                                    <Form.Control rows={5} as={'textarea'} placeholder="Nhập hướng dẫn ..."/>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                    <Col sm={6}>
                        <EditorPhp/>
                        <Form.Row className={'mt-2'}>
                            <Col>
                                <Form.Label>Kết quả</Form.Label>
                                <Form.Control placeholder="Nhập kết quả ..."/>
                            </Col>
                        </Form.Row>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col sm={{span: 4}}>
                        <Button variant={'success'} block={true}>Tạo</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
});

export default ModalCreateQuiz;