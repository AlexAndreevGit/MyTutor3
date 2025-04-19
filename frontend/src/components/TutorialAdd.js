import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TutorialAdd() {
    const [formData, setFormData] = useState({      //object formData with 4 fields/parameters
        name: '',
        description: '',
        price: '',
        category: ''
    });
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // Fetch categories when component mounts
    useEffect(() => {
        fetch('/api/tutorials/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        // Also fetch CSRF token for form submission
        fetch('/api/csrf')
            .then(response => response.json())
            .then(data => {

                console.log(data)
                //
                const form = document.querySelector('form[action="/tutorials/add"]');
                if (form && data.token) {

                    // Remove any existing CSRF input
                    const existingCsrf = form.querySelector(`input[name="${data.parameterName}"]`);
                    if (existingCsrf) existingCsrf.remove();

                    // Add new CSRF input
                    const csrfInput = document.createElement('input');
                    csrfInput.type = 'hidden';
                    csrfInput.name = data.parameterName;
                    csrfInput.value = data.token;
                    form.appendChild(csrfInput);
                }
            })
            .catch(error => console.error('Could not fetch CSRF token:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name || formData.name.length < 2 || formData.name.length > 40) {
            newErrors.name = 'The name length must be between 2 and 40 characters!';
        }

        if (!formData.description || formData.description.length < 2 || formData.description.length > 200) {
            newErrors.description = 'The description length must be between 2 and 200 characters!';
        }

        if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'The price should be a positive number!';
        }

        if (!formData.category) {
            newErrors.category = 'Please select a category for your offer.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <main className="container py-4">
            <div className="form-container">
                <div className="form-icon">
                    <i className="fas fa-chalkboard-teacher"></i>
                </div>

                <div className="form-header">
                    <h1 className="form-title">Add Tutoring Offer</h1>
                    <p className="form-subtitle">Share your expertise with students who need your help</p>
                </div>

                <form action="/tutorials/add" method="POST">
                    <div className="form-group">
                        <label className="form-label" htmlFor="offerName">Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="offerName"
                            name="name"
                            placeholder="Name your tutoring offer"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && (
                            <small className="invalid-feedback">{errors.name}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="offerDescription">Offer Description</label>
                        <textarea
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            id="offerDescription"
                            name="description"
                            rows="3"
                            placeholder="Describe what you can help with"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                        {errors.description && (
                            <small className="invalid-feedback">{errors.description}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="offerPrice">Price Per Hour</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                id="offerPrice"
                                name="price"
                                placeholder="Enter your hourly rate"
                                value={formData.price}
                                onChange={handleChange}
                            />
                            <span className="input-group-text">EUR</span>
                        </div>
                        {errors.price && (
                            <small className="invalid-feedback">{errors.price}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="offerCategory">Category</label>
                        <select
                            className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                            id="offerCategory"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <small className="invalid-feedback">{errors.category}</small>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn-submit"
                            onClick={(e) => {
                                e.preventDefault();
                                if (validateForm()) {
                                    e.target.closest('form').submit();
                                }
                            }}
                        >
                            <i className="fas fa-plus-circle me-2"></i> Create Offer
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default TutorialAdd;