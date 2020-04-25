import {useEffect, useState} from 'react';
const useForm = (stateSchema,callback,validate) =>{
    const [values, setValues] = useState(stateSchema);
    const [errors, setErrors] = useState(stateSchema);
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = e => {
        const {name,value} = e.target;
        setValues({
            ...values,
            [name] : value
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        //validate all here
        setErrors(validate(values));
    };
    useEffect(()=>{
        if (Object.keys(errors).length === 0 && isSubmit)
            callback()
    },[callback, errors, isSubmit]);
    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }
};
export default useForm;