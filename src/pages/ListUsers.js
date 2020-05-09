import React, {useState} from 'react';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";

const ListUsers = () => {
    const [language,setLanguage] = useState('');

    function handleEdit() {

    }
    return (
        <div className={'content'}>
            <div className={'box'}>
                <h1 className={'title'}>Nội dung <i className="las la-angle-right"/>Danh sách người dùng</h1>
                <Table striped bordered hover variant={'dark'}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Tên đăng nhập</th>
                        <th>Ngày tạo</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td className={'text-center'}><Button onClick={handleEdit} variant={'info'} size={"sm"}><i
                            className="las la-edit"/>Chỉnh sửa</Button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>Thornton</td>
                        <td className={'text-center'}><Button onClick={handleEdit} variant={'info'} size={"sm"}><i
                            className="las la-edit"/>Chỉnh sửa</Button></td>
                    </tr>
                    </tbody>
                </Table>
                <Container className={'mt-4'} fluid={true}>
                    <Form.Row>
                        <Col>
                            <Form.Control as="select" placeholder={'Chọn khoá học...'} value={language} onChange={(e)=>setLanguage(e.target.value)}>
                                <option value={0} disabled={true}>Chọn khoá học...</option>
                                <option value={1}>Quản trị viên</option>
                                <option value={2}>Người sử dụng</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control placeholder="Nhập tên khoá học ..." />
                        </Col>
                        <Col>
                            <Button variant="success" block={true}><i className="las la-plus"/>Tạo</Button>
                        </Col>
                    </Form.Row>
                </Container>
                <Container className={'mt-4'} fluid={true}>
                    <Row>
                        <Col sm={6}>
                            <Button variant="success" block={true}><i className="las la-plus"/>Thêm thành viên</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default ListUsers;