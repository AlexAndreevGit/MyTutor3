import React, {useEffect, useState} from "react";
import {addCsrfTokenToForm1, addCsrfTokenToForm2} from "./Utils";
import {Link} from "react-router-dom";

function Register(){

    //the useState hook os used to control the state of the React component
    const[formData, setFormData] = useState({
        username: '',
        email:'',
        designation:'',
        password:'',
        confirmPassword:''
    })

    function handleCheckboxChange(role) {
        setFormData(prev => ({
            ...prev,
            designation: prev.designation === role ? "" : role // deselect if clicked again
        }));
    }

    //handle change is a function triggered every time when the user types in the input field because each field contains an onChange event onChange={handleChange}
    function handleChange(event) {

        // Get the input's name (like "email") and value (like "alice@example.com")
        const inputName = event.target.name;     //inputName contains the name of the input field that triggered the event, e.g. "username", "email", etc.
        const inputValue = event.target.value;  //inputValue contains the current value of the feald

        setFormData({
            ...formData,    //... means "spread operator" - it copies all properties from formData
            [inputName]: inputValue
        })

    }

    //the useEffect hook is updated every time the formData state is updated
    useEffect(() => {
        console.log(formData)
    }, [formData]);


    useEffect(() => {
        addCsrfTokenToForm2("/users/register")
    }, []);

    return(
        <main className="container py-4">
            <div className="form-container">
                <div className="form-icon">
                    <i className="fas fa-user-plus"></i>
                </div>

                <div className="form-header">
                    <h1 className="form-title">Create Account</h1>
                    <p className="form-subtitle">Join our tutoring community today</p>
                </div>

                <form id="registerFormID" action="/users/register" method="POST">

                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"  //works together with htmlFor="username". we click on the label and the input field gets focused
                            name="username"
                            placeholder="Choose a username"
                            value={formData.username}
                            onChange={handleChange}
                            required //the browser prevent the form to be send unless the field is filled in
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"  //works together with htmlFor="username". we click on the label and the input field gets focused
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            required //the browser prevent the form to be send unless the field is filled in
                        />
                    </div>

                    <div className="form-group">

                        <input
                            type="hidden"
                            name="designation"
                            value={formData.designation}/>

                        <div className="form-group">
                            <label className="form-label">Your designation:</label>

                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="studentCheckbox"
                                    checked={formData.designation === "student"}
                                    onChange={() => handleCheckboxChange("student")}
                                />
                                <label className="form-check-label" htmlFor="studentCheckbox">
                                    I want to be a Student
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="tutorCheckbox"
                                    checked={formData.designation === "tutor"}
                                    onChange={() => handleCheckboxChange("tutor")}
                                />
                                <label className="form-check-label" htmlFor="tutorCheckbox">
                                    I want to be a Tutor
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"  //works together with htmlFor="username". we click on the label and the input field gets focused
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required //the browser prevent the form to be send unless the field is filled in
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"  //works together with htmlFor="username". we click on the label and the input field gets focused
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required //the browser prevent the form to be send unless the field is filled in
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-submit">
                            <i className="fas fa-user-plus me-2"></i> Create Account
                        </button>
                    </div>

                    <div className="form-footer">
                        Already have an account? <Link to="/users/login">Sign in</Link>
                    </div>

                </form>

            </div>
        </main>

    )

}

export default Register;