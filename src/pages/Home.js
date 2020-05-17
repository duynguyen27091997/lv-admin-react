import React, {useEffect, useState} from 'react';
import {AxiosUsBe} from "../utils/axios";
import {Col, Container, Row} from "react-bootstrap";
import BoxPie from "../components/home/BoxPie";
import CourseBox from "../components/home/CourseBox";

const Home = () => {
    let [content,setContent] = useState(null);
    useEffect(_ => {
        AxiosUsBe.get('/api/homepage')
            .then(({data: res}) => {
                setContent(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <div className={'content'}>
            <div className={'box'}>
                {content && <Container fluid={true}>
                    <Row>
                        <Col sm={6}>
                            <div className={'card--home'}>
                                <BoxPie data={content}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={'card--home'}>
                                <CourseBox data={content}/>
                            </div>
                        </Col>
                    </Row>
                </Container>}
            </div>
        </div>
    );
};

export default Home;