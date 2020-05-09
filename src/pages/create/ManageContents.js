import React, {useEffect, useRef, useState} from 'react';
import {Button, Row, Tab, Table, Tabs} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import ModalCreateQuiz from "../../components/modal/ModalCreateQuiz";
import {AxiosUsBe} from "../../utils/axios";
import {setAuth} from "../../actions/rootAction";
import {sleep} from "../../helpers/helpers";
import {useDispatch} from "react-redux";

const ManageContents = () => {
    const [key, setKey] = useState('lesson');

    const [next, setNext] = useState(false);
    const [course, setCourse] = useState(false);
    const [list,setList] = useState([])
    function handleEdit(course) {
        setNext(!next);
        setCourse(course)
    }
    useEffect(_ => {
        AxiosUsBe.get('api/course')
            .then(({data: res}) => {
                if (res.success) {
                    setList(res.data);
                }
            })
            .catch(err => {
                setList([]);
            })
    }, [])

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
                        <Table>
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
                            {
                                list.map(course =><tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>{course.name}</td>
                                    <td>{course['LanguageChallenges'][0]['title']}</td>
                                    <td>{course.createdAt}</td>
                                    <td>{course.authorId}</td>
                                    <td className={'text-center'}><Button onClick={()=>handleEdit(course)} variant={'info'} size={"sm"}><i
                                        className="las la-edit"/>Chỉnh sửa</Button></td>
                                </tr>)
                            }
                            </tbody>
                        </Table>
                        :
                        <div>
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
                            <Button style={{marginTop:'25px'}} variant={'outline-secondary'} onClick={()=>setNext(false)} size={"sm"}>Quay lại</Button>
                        </div>
                }
            </div>
            <ModalCreateQuiz course={course} ref={refModal}/>
        </div>

    );
};

export default ManageContents;