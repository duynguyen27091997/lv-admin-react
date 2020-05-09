import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";

const FormLanguage = ({languageId = 0,onChange}) => {
    return (
        <Form.Control defaultValue={0} name={'languageId'} as="select" placeholder={'Chọn khoá học...'} value={languageId} onChange={(e)=>onChange(e)}>
            <option value={0} disabled={true}>Chọn khoá học...</option>
            <option value={1}>Javascript</option>
            <option value={2}>C</option>
            <option value={3}>C++</option>
            <option value={4}>Php</option>
            <option value={5}>Pascal</option>
            <option value={6}>Java</option>
        </Form.Control>
    );
};

export default FormLanguage;