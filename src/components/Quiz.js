import React, {useRef, useState} from 'react';
import ModalUpdateQuiz from "./modal/ModalUpdateQuiz";
import {Button, Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

const Quiz = ({course,quiz,active,deleteQuiz,edit}) => {
    const refModalQz = useRef(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick  =()=>{
        refModalQz.current.show()
    }
    return (<div className={'d-inline-block'}>
            <span className={!quiz.active ?"disabled" : undefined} onClick={handleShow}>{quiz.title}</span>
            <Modal show={show} onHide={handleClose} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1 className={'title mb-0'}>Quiz</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'d-flex justify-content-between align-items-center'}>
                        <h6>{quiz.title}</h6>
                        <div style={{flex:'0 0 150px'}} className={'d-flex justify-content-center align-items-center'}>
                        <Form.Check onChange={(e) => {handleClose();active(e, quiz,1)}}
                                    value={quiz.active}
                                    checked={quiz.active} style={{fontSize: '15px'}}
                                    className={'text-muted mr-3'} type="checkbox"/>
                        {
                            quiz.active ?
                            <div className={'button-manage mr-3'} onClick={()=>{handleClose();handleClick()}}><i
                                className="las la-edit "/></div>
                            :
                            <div className={'button-manage mr-3'} style={{opacity: .3}}><i
                            className="las la-edit "/></div>
                        }
                        <Button onClick={(e) => {handleClose();deleteQuiz(e, quiz,1)}}
                                variant={'danger p-1'} size={'sm'}><i
                            style={{fontSize: '18px', verticalAlign: 'middle'}}
                            className="lar la-trash-alt mr-0"/></Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ModalUpdateQuiz edit={edit} course={course} quiz={quiz} ref={refModalQz}/>
        </div>
    );
};

export default Quiz;