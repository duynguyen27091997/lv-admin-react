import {useEffect, useState} from 'react';

const useForm = (stateSchema, callback, validate) => {
    const [values, setValues] = useState(stateSchema);
    let tempOb = {}
    Object.keys(stateSchema).forEach(k => tempOb[k] = "");
    const [errors, setErrors] = useState(tempOb);
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        //validate all here
        setErrors(validate(values));
    };
    const resetForm = (e) => {
        setValues(stateSchema);
        let tempOb = {}
        Object.keys(stateSchema).forEach(k => tempOb[k] = "");
        setErrors(tempOb);
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit)
            callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors, isSubmit]);
    return {
        handleChange,
        handleSubmit,
        values,
        errors,
        resetForm
    }
};
export default useForm;