import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    useEffect(() => {
        fetch('/api/csrf')
            .then(response => response.json())
            .then(data => {

                const form = document.querySelector('form[action="/users/register"]');
                if (form && data.token) {


                    const csrfInput = document.createElement('input');
                    csrfInput.type = 'hidden';
                    csrfInput.name = data.parameterName;
                    csrfInput.value = data.token;
                    form.appendChild(csrfInput);
                }
            })
            .catch(error => console.error('Could not fetch CSRF token:', error));
    }, []);

    return (
        <main className="container py-4">
            <div className="form-container">
                <div className="form-icon">
                    <i className="fas fa-user-plus"></i>
                </div>

                <div className="form-header">
                    <h1 className="form-title">Create Account</h1>
                    <p className="form-subtitle">Join our tutoring community today</p>
                </div>


                <form action="/users/register" method="POST">
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            id="username"
                            name="username"
                            placeholder="Choose a username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        {errors.username && (
                            <small className="invalid-feedback">Username length must be between 2 and 40 characters!</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && (
                            <small className="invalid-feedback">Email can't be empty!</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && (
                            <small className="invalid-feedback">Password length must be between 2 and 40 characters!</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && (
                            <small className="invalid-feedback">Passwords must match!</small>
                        )}
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
    );
}

export default Register;