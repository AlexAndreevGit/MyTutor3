import React, {useState, useEffect} from 'react';
import {addCsrfTokenToForm} from "./Utils";


function TutorialAdd() {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
    })

    const [errors, setErrors] = useState({})
    const [categoies, setCategories] = useState([])

    useEffect(() => {

        fetch('/api/tutorials/categories')
            .then(result => result.json())
            .then(data => {
                setCategories(data)
            }).catch(error => {
            console.error("Error fetching categories: ", error)
        })

        addCsrfTokenToForm("formID");


    }, []);

    function handleChange(event) {


        const inputFieldName = event.target.name;
        const inputFieldValue = event.target.value;

        setFormData({

            ...formData,
            [inputFieldName]: inputFieldValue

        })



    }

    const validateForm = () => {   //anonymous function. function without name
        const newErrors = {}

        if (!formData.name || formData.name.length < 2 || formData.name.length > 40) {  //!formData.name is empty, null, undefined or 0
            newErrors.name = 'The name length must be between 2 and 40 characters!'
        }

        if (!formData.description || formData.description.length < 2 || formData.description.length > 200) {
            newErrors.description = 'The description length must be between 2 and 200 characters!'
        }

        if (!formData.price || isNaN(formData.price) || formData.price <= 0) {     //isNan is not a number
            newErrors.price = 'The price should be a positive number'
        }

        if (!formData.category) {
            newErrors.category = 'Please set a category for your offer.'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0 //in React "===" compare value end type

    }


    return (
        <main className="container py-4" >

            <div className="form-container">
                <div className="form-icon">
                    <i className="fas fa-chalkboard-teacher"></i>
                </div>

                <div className="form-header">
                    <h1 className="form-title">Add Tutoring Offer</h1>
                    <p className="form-subtitle">Share your expertise with students who need your help</p>
                </div>

                <form id='formID' action="/tutorials/add" method="POST">

                    <div className="form-group">
                        <label className="form-label">Offer Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}    // ```define the template library, ${...} embedded a JS expression
                            name="name"                                                     //have to be the same as in the DTO
                            placeholder="Name your tutoring offer"                          // ""-static string, {}-dynamic string
                            value={formData.name}
                            onChange={handleChange}
                        />

                        {errors.name && (
                            <small className='invalid-feedback'>{errors.name}</small>
                        )}

                    </div>

                    <div className="form-group">
                        <label className="form-label">Offer Description</label>
                        <input
                            type="text"
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}    // ```define the template library, ${...} embedded a JS expression
                            name="description"                                                     //have to be the same as in the DTO
                            placeholder="Describe what you can help with"                          // ""-static string, {}-dynamic string
                            value={formData.description}
                            onChange={handleChange}
                        />

                        {errors.description && (
                            <small className='invalid-feedback'>{errors.description}</small>
                        )}

                    </div>

                    <div className="form-group">
                        <label className="form-label">Price Per Hour</label>
                        {/*input-group - Bootstrap to put the both in the same row*/}
                        <div className="input-group">
                            <input
                                type="text"
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                name="price"
                                placeholder="Enter your hourly rate"
                                value={formData.price}
                                onChange={handleChange}
                            />
                            {/* only a self closing tag because <input> is a void element in HTML. It does not have any child element*/}
                            <span className="input-group-text">EUR</span>
                        </div>
                        {errors.price && (
                            <small className="invalid-feedback">{errors.price}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Category</label>
                        {/*Select is a drop-down menu*/}
                        <select
                            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">Select a category</option>
                            {/*<option key="MATHEMATICS" value="MATHEMATICS">MATHEMATICS</option>*/}
                            {/*<option key="INFORMATICS" value="INFORMATICS">INFORMATICS</option>*/}
                            {/*<option key="OTHER" value="OTHER">OTHER</option>*/}

                            {/*In react the key prop is crucial when rendering list elements.*/}
                            {/*The key gives each item unique identity*/}
                            {categoies.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}

                        </select>
                        {
                            errors.category && (
                                <small className="invalid-feedback">{errors.category}</small>
                            )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn-submit"
                            onClick={(event) => {
                                event.preventDefault()
                                if (validateForm()) {
                                    console.log("Im here")
                                    event.target.closest('form').submit()
                                }
                            }}
                        >
                            <i className="fas fa-plus-circle me-2"> Create Offer</i>
                        </button>
                    </div>

                </form>
            </div>
        </main>
    )
}

export default TutorialAdd;