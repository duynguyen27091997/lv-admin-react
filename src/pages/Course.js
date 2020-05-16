import React, {useEffect, useRef, useState} from 'react';
import "./course.scss"
import {Col, Form, Row, Tab, Tabs} from "react-bootstrap";
import ModalCreateQuiz from "../components/modal/ModalCreateQuiz";
import errorImg from "../assets/img/interface.png";
import {AxiosUsBe} from "../utils/axios";
import {useSelector} from "react-redux";
import ModalCreateExercise from "../components/modal/ModalCreateExercise";
import ModalCreateAssessment from "../components/modal/ModalCreateAssessment";
import FormAssessment from "../components/form/FormAssessment";

const Course = (props) => {
    const user = useSelector(state => state.main.user);

    const [key, setKey] = useState('lesson');
    const [level, setLevel] = useState(0);
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(true);
    const [listQuiz, setListQuiz] = useState([]);
    const [listExercise, setListExercise] = useState([]);
    const [listObject, setListObject] = useState([]);
    const [listObjectEx, setListObjectEx] = useState([]);
    const [course, setCourse] = useState(null);
    const refModalQz = useRef(null);
    const refModalEx = useRef(null);

    const handleShow = (level, number) => {
        setLevel(level)
        setNumber(number)
        refModalQz.current.show()
    };
    const handleShowEx = (level, number) => {
        setLevel(level)
        setNumber(number)
        refModalEx.current.show()
    };

    const addQuiz = (quiz) => {
        setListQuiz([...listQuiz, quiz])
    }
    const addExercise = (quiz) => {
        setListExercise([...listExercise, quiz])
    }
    //init page
    useEffect(_ => {
        AxiosUsBe.get(`/api/course/${props.match.params.courseId}`)
            .then(({data: res}) => {
                if (res.data.authorId === parseInt(user.id))
                    setCourse(res.data);
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        AxiosUsBe.get(`/api/quiz-by-course/${props.match.params.courseId}`)
            .then(({data: res}) => {
                setListQuiz(res.data.filter(quiz => quiz.kindChallengeId === 1))
                setListExercise(res.data.filter(quiz => quiz.kindChallengeId === 2))
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.match.params.courseId, user.id])
    useEffect(_ => {
        if (listQuiz) {
            setListObject(new Set(listQuiz.map(item => item.levelId)))
        }
    }, [listQuiz])
    useEffect(_ => {
        if (listExercise) {
            setListObjectEx(new Set(listExercise.map(item => item.levelId)))
        }
    }, [listExercise])
    return (
        <div className={'content edit-content'}>
            {
                !loading ?
                    course ?
                        <div className={'box p-4'}>
                            <h1 className={'title'}>Quản lí khoá học <i className="las la-angle-right"/> Khoá học <i
                                className="las la-angle-right"/>
                                {course.name}
                            </h1>
                            <Tabs
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                id={'courseTabs'}>
                                <Tab eventKey="lesson" title="Bài học">
                                    <div className={'my-4'}>
                                        {
                                            Array.from(listObject).map(level =>
                                                <div key={level} className={"object mb-3"}>
                                                    <h6>Bài {level}</h6>
                                                    {
                                                        (listQuiz.filter(quiz => quiz.levelId === level)).map((quiz, index, list) =>
                                                            <span key={quiz.id}>{quiz.title}</span>)
                                                    }
                                                    <span className={'object__create'}
                                                          onClick={() => handleShow(level, listQuiz.filter(quiz => quiz.levelId === level).length + 1)}><i
                                                        className="las la-plus"/></span>
                                                </div>)
                                        }
                                        <div className={'object__create w-100 text-center'}
                                             onClick={() => handleShow(Math.min(listObject.size + 1, 10), 1)}><i
                                            className="las la-plus"/></div>
                                    </div>


                                </Tab>
                                <Tab eventKey="exercise" title="Luyện tập">
                                    <div className={'my-4'}>
                                        {
                                            Array.from(listObjectEx).map(level =>
                                                <div key={level} className={"object mb-3"}>
                                                    <h6>Bài {level}</h6>
                                                    {
                                                        (listExercise.filter(quiz => quiz.levelId === level)).map(quiz =>
                                                            <span key={quiz.id}>{quiz.title}</span>)
                                                    }
                                                    <span className={'object__create'}
                                                          onClick={() => handleShowEx(level, listExercise.filter(quiz => quiz.levelId === level).length + 1)}><i
                                                        className="las la-plus"/></span>
                                                </div>)
                                        }
                                        <div className={'object__create w-100 text-center'}
                                             onClick={() => handleShowEx(Math.min(listObjectEx.size + 1, 10), 1)}><i
                                            className="las la-plus"/></div>
                                    </div>
                                </Tab>
                                <Tab eventKey="test" title="Kiểm tra">
                                    <div className={'my-4'}>
                                        <FormAssessment course={course} />
                                    </div>
                                </Tab>
                            </Tabs>
                            <ModalCreateExercise level={level} number={number} course={course} ref={refModalEx}
                                                 add={(quiz) => addExercise(quiz)}/>
                            <ModalCreateQuiz level={level} number={number} course={course} ref={refModalQz}
                                             add={(quiz) => addQuiz(quiz)}/>
                        </div>
                        :
                        <div className={'box p-4 text-center'}>
                            <img width={100} src={errorImg} alt=""/>
                            <h4 className={'text-danger mt-4'}>Khoá học không tồn tại hoặc không phải là của bạn .</h4>
                        </div>
                    : null
            }
        </div>
    );
};

export default Course;