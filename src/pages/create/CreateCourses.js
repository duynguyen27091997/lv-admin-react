import React, {useState} from 'react';
import {Button, Col, Form} from "react-bootstrap";

const CreateCourses = () => {
    const [language,setLanguage] = useState(0);
    return (
        <div className={'content'}>
            <div className={'box'}>
                <h1 className={'title'}>Quản lí khoá học <i className="las la-angle-right"/>Tạo khoá học</h1>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Control as="select" placeholder={'Chọn khoá học...'} value={language} onChange={(e)=>setLanguage(e.target.value)}>
                                <option value={0} disabled={true}>Chọn khoá học...</option>
                                <option>Javascript</option>
                                <option>Php</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control placeholder="Nhập tên khoá học ..." />
                        </Col>
                        <Col>
                            <Button variant="success" block={true}><i className="las la-plus"/>Tạo</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        </div>
    );
};

export default CreateCourses;