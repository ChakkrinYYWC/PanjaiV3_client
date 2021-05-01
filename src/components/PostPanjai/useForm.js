import React, { useEffect, useState } from "react";

const useForm = (initialFieldValues, setCurrentId) => {

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const [file, setFile] = useState([])
    const [category, setCategory] = useState('');

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }


    const resetForm = () => {
        setValues(initialFieldValues)
        setErrors({})
        setFile([])
        setCurrentId(0)
    }
    
    const resetFormFDT = () => {
        setValues(initialFieldValues)
        setErrors({})
        setFile([])
        setCategory('')
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        resetFormFDT,
        file,
        setFile,
        category,
        setCategory
    };
}

export default useForm;

