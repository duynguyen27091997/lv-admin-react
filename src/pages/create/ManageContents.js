import React, { useRef, useState} from 'react';
import {Button, Row, Tab, Table, Tabs} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import ModalCreateQuiz from "../../components/modal/ModalCreateQuiz";

const ManageContents = () => {
    const [key, setKey] = useState('lesson');

    const [next, setNext] = useState(false);

    function handleEdit() {
        setNext(!next);
    }

    const refModal = useRef(null);

    const handleShow = () => {
        refModal.current.show()
    };
    return (
        <div className={'content edit-content'}>
            <div className={'box'}>
                <h1 className={'title'}>Quản lí khoá học <i className="las la-angle-right"/> Quản lí nội dung</h1>
                {
                    !next
                        ?
                        <Table striped bordered hover variant={'dark'}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên khoá học</th>
                                <th>Ngôn ngữ lập trình</th>
                                <th>Ngày tạo</th>
                                <th>Người tạo</th>
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
                        :
                        <Tabs
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            id={'courseTabs'}>
                            <Tab eventKey="lesson" title="Bài học">
                                <Row className={'mt-4'}>
                                    <Col sm={{span: 4}}>
                                        <Button variant={'success'} onClick={handleShow} block={true}>Tạo</Button>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="exercise" title="Luyện tập">

                            </Tab>
                            <Tab eventKey="test" title="Kiểm tra">

                            </Tab>
                        </Tabs>
                }
            </div>
            <ModalCreateQuiz ref={refModal}/>
        </div>

    );
};

export default ManageContents;