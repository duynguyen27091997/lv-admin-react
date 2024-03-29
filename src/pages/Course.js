import React, {useEffect, useRef, useState} from 'react';
import "./course.scss"
import {Tab, Tabs} from "react-bootstrap";
import ModalCreateQuiz from "../components/modal/ModalCreateQuiz";
import errorImg from "../assets/img/interface.png";
import {AxiosUsBe} from "../utils/axios";
import {useSelector} from "react-redux";
import ModalCreateExercise from "../components/modal/ModalCreateExercise";

import FormAssessment from "../components/form/FormAssessment";
import Quiz from "../components/Quiz";
import swal from "sweetalert";
import qs from "querystring";
import Exercise from "../components/Exercise";

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
    const handleDelete = (e, quiz, type = 1) => {
        swal({
            title: "Bạn có chắc muốn xoá bài học",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(r => {
            if (r) {
                AxiosUsBe.delete(`/api/quiz/${quiz.id}`)
                    .then(({data: res}) => {
                        if (res.success) {
                            swal({
                                title: "Xoá bài học thành công",
                                icon: "success",
                                buttons: false,
                                timer: 1500
                            }).then()
                            if (type === 1) {
                                setListQuiz([...listQuiz.filter(item => item.id !== quiz.id)]);
                            } else {
                                setListExercise([...listExercise.filter(item => item.id !== quiz.id)]);
                            }
                        }
                    })
            }
        })
    }
    const handleEdit = (payload, type = 1) => {
        if (type === 1) {
            let currentIndex = listQuiz.findIndex(item => item.id === payload.id);
            let newListUser = [...listQuiz];
            newListUser.splice(currentIndex, 1, payload);
            setListQuiz(newListUser);
        } else {
            let currentIndex = listExercise.findIndex(item => item.id === payload.id);
            let newListUser = [...listExercise];
            newListUser.splice(currentIndex, 1, payload);
            setListExercise(newListUser);
        }
    }
    const handleActive = (e, quiz, type) => {
        e.preventDefault();
        let isTrueSet = e.target.value === 'true';
        let payload = {
            id: quiz.id,
            status: !isTrueSet,
            keyName: 'quiz'
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
                            if (type === 1) {
                                let currentIndex = listQuiz.findIndex(item => item.id === quiz.id);
                                let newListUser = [...listQuiz];
                                newListUser[currentIndex].active = !isTrueSet;
                                setListQuiz(newListUser);
                            } else {
                                let currentIndex = listExercise.findIndex(item => item.id === quiz.id);
                                let newListUser = [...listExercise];
                                newListUser[currentIndex].active = !isTrueSet;
                                setListExercise(newListUser);
                            }
                        }
                    })
            }
        })
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
                let sortArr = res.data.sort((a, b) => a.levelId - b.levelId);
                setListQuiz(sortArr.filter(quiz => quiz.kindChallengeId === 1))
                setListExercise(sortArr.filter(quiz => quiz.kindChallengeId === 2))
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.match.params.courseId, user.id])
    useEffect(_ => {
        if (listQuiz.length) {
            let maxId = Math.max.apply(Math, listQuiz.map(quiz => quiz.levelId))
            let newSet = new Set();
            for (let i = 1; i <= maxId; i++) {
                newSet.add(i);
            }
            setListObject(newSet);
        } else {
            setListObject(new Set());
        }
    }, [listQuiz])
    useEffect(_ => {
        if (listExercise.length) {
            let maxId = Math.max.apply(Math, listExercise.map(quiz => quiz.levelId))
            let newSet = new Set();
            for (let i = 1; i <= maxId; i++) {
                newSet.add(i);
            }
            setListObjectEx(newSet);
        } else {
            setListObjectEx(new Set());
        }
    }, [listExercise])
    return (
        <div className={'content edit-content'}>
            {
                !loading ?
                    course ?
                        <div className={'box p-4'}>
                            <h1 className={'title'}>Quản lí khoá học <i className="las la-angle-right"/> Khoá học của
                                tôi <i
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
                                                        (listQuiz.sort((a, b) => a.sequenceNumber - b.sequenceNumber).filter(quiz => quiz.levelId === level)).map((quiz, index, list) =>
                                                            <Quiz edit={handleEdit} active={handleActive}
                                                                  deleteQuiz={handleDelete} course={course} key={index}
                                                                  quiz={quiz} level={level} index={index}/>)
                                                    }
                                                    <div className={'d-inline-block'}>
                                                    <span className={'object__create'}
                                                          onClick={() => handleShow(level, listQuiz.filter(quiz => quiz.levelId === level).length + 1)}><i
                                                        className="las la-plus"/></span>
                                                    </div>
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
                                                        (listExercise.sort((a, b) => a.sequenceNumber - b.sequenceNumber).filter(quiz => quiz.levelId === level)).map((quiz, index) =>
                                                            <Exercise edit={handleEdit} active={handleActive}
                                                                      deleteQuiz={handleDelete} course={course}
                                                                      key={index} quiz={quiz} level={level} index={index}/>)
                                                    }
                                                    <div className={'d-inline-block'}>
                                                    <span className={'object__create'}
                                                          onClick={() => handleShowEx(level, listExercise.filter(quiz => quiz.levelId === level).length + 1)}><i
                                                        className="las la-plus"/></span>
                                                    </div>
                                                </div>)
                                        }
                                        <div className={'object__create w-100 text-center'}
                                             onClick={() => handleShowEx(Math.min(listObjectEx.size + 1, 10), 1)}><i
                                            className="las la-plus"/></div>
                                    </div>
                                </Tab>
                                <Tab eventKey="test" title="Kiểm tra">
                                    <div className={'my-4'}>
                                        <FormAssessment course={course} quizzes={[...listQuiz.sort((a,b)=>a.levelId - b.levelId), ...listExercise]}/>
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