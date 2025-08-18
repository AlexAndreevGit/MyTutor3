import React, {useEffect, useState} from "react";
import {addCsrfTokenToForm1} from "./Utils";

//functional component
function TutorialAdd(){

    //useState is a hook that allows you to add state to functional components
    const [formData,setFormData] = useState({
        name:'',
        description:'',
        price:'',
        category:''
    })

    const [errors, setErrors] = useState({})  //initialised with and empty object {} because we expect to store key value pairs
    const [categories, setCategories] = useState([]) //initialised with an empty array [], because we expect to store a list of categories

    function handleChange(event) {

        const inputFieldName = event.target.name
        const inputFieldValue = event.target.value
5
        setFormData({
            ...formData,
            [inputFieldName]:inputFieldValue
        })

    }

    useEffect(() => {
        console.log(formData)
    }, [formData]);

    //useEffect hook that will be executed once in order to fentch the categories
    useEffect(() => {
        fetch("/api/tutorials/categories")
            .then(result => result.json())
            .then(
                data=>{setCategories(data)
            })
    }, []);

    //the useEffect hook will be executed once
    useEffect(() => {
        addCsrfTokenToForm1("formID")
    }, []);

    const validateForm = () =>{

        const newErrors = {} //create a new java spring object to store the errors

        if(!formData.name|| formData.name.length < 2 || formData.name.length > 40){
            newErrors.name = "The name length must be between 2 and 40 characters!"
        }

        if(formData.description.trim() === ""|| formData.description.length < 2 || formData.description.length > 200){
            newErrors.description = "The description length must be between 2 and 200 characters!"
        }

        if(formData.price <=0 || !formData.price || isNaN(formData.price) ){
            newErrors.price = "The price should be a positive number!"
        }

        if(!formData.category){
            newErrors.category = "Please set a category for your offer!"
        }

        setErrors(newErrors)

        console.log("New error",newErrors)
        console.log("Result of the function",Object.keys(newErrors).length)
        //return true if no errors
        return Object.keys(newErrors).length === 0


    }

    return(
        <main className="container py-4">
            <div className="form-container">
                <div className="form-icon">
                    <i className="fas fa-chalkboard-teacher"></i>
                </div>

                <div className="form-header">
                    <h1 className="form-title">Add Tutoring Offer</h1>
                    <p className="form-subtitle">Share your expertise with students who need your help</p>
                </div>

                <form id="formID" action="/tutorials/add" method="POST">
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Offer Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? `is-invalid`: '' }`}  //${} expression to enable JS expression in a string
                            id="name"
                            name="name"
                            placeholder="Name your tutoring offer"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {/*in JS everything inside of {} is independent JS*/}
                        {errors.name && <small className='invalid-feedback'>{errors.name}</small> }
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="description">Offer Description</label>
                        <input
                            type="text"
                            className={`form-control ${errors.description ? `is-invalid`: '' }`}
                            id="description"
                            name="description"
                            placeholder="Describe what you can help with"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {errors.description && <small className='invalid-feedback'>{errors.description}</small> }
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="price" >Price Per Hour</label>
                        <input
                            type="text"
                            className={`form-control ${errors.price ? `is-invalid`: '' }`}
                            id="price"
                            name="price"
                            placeholder="Enter your hourly rate"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        {errors.price && <small className='invalid-feedback'>{errors.price}</small> }

                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="category">Category</label>
                        <select
                            className={`form-control ${errors.category ? `is-invalid`: '' }`}
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">Select a category</option>
                            {/*<option key="MATHEMATICS" value="MATHEMATICS">MATHEMATICS</option>*/}
                            {/*<option key="INFORMATICS" value="INFORMATICS">INFORMATICS</option>*/}
                            {/*<option key="OHER" value="OTHER">OTHER</option>*/}

                            {categories.map((category) =>(
                              <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        {errors.category && <small className='invalid-feedback'>{errors.category}</small> }
                    </div>

                    <div className="form-actions">
                        <button className="btn-submit" type="submit"
                        onClick={(event) => {
                         event.preventDefault()
                         if(validateForm()){
                             console.log(formData)
                             console.log(errors)
                             if(window.confirm("Are you sure you want to submit offer?")){
                                 event.target.form.submit()
                             }

                         }
                        }}
                        >
                            <i className="fas fa-paper-plane me-2"></i> Create Offer
                        </button>
                    </div>

                </form>

            </div>
        </main>
    )

}

export default TutorialAdd;