import React, {useEffect, useRef, useState} from 'react';
import {Button, Row, Tab, Tabs} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import ModalCreateQuiz from "../components/modal/ModalCreateQuiz";
import errorImg from "../assets/img/interface.png";
import {AxiosUsBe} from "../utils/axios";

const Course = (props) => {
    const [key, setKey] = useState('lesson');
    const [course, setCourse] = useState(null);
    const refModal = useRef(null);

    const handleShow = () => {
        refModal.current.show()
    };

    //init page
    useEffect(_ => {
        AxiosUsBe.get(`/api/quiz-by-course/${props.match.params.courseId}`)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
    }, [])
    return (
        <div className={'content'}>
            {
                course ?
                    <div className={'box p-4 text-center'}>
                        <div>
                            <h1 className={'title'}>Quản lí khoá học <i className="las la-angle-right"/> Quản lí nội
                                dung
                            </h1>
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
                        </div>
                        <ModalCreateQuiz course={course} ref={refModal}/>
                    </div>
                    :
                    <div className={'box p-4 text-center'}>
                        <img width={100} src={errorImg} alt=""/>
                        <h4 className={'text-danger mt-4'}>Khoá học không tồn tại hoặc không phải là của bạn .</h4>
                    </div>
            }
        </div>
    );
};

export default Course;