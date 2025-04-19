import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('user1');
    const [password, setPassword] = useState('12345');
    const location = useLocation();
    const isLoginError = location.pathname === '/users/login-error';

    // Show message if we're at the login-error URL
    useEffect(() => {
        if (isLoginError) {
            document.getElementById('login-error-alert').style.display = 'block';
        }
    }, [isLoginError]);

    // Show popup message
    useEffect(() => {
        const popup = document.getElementById("message");
        if (popup) {
            setTimeout(() => {
                popup.style.display = "block";
                setTimeout(() => popup.style.display = "none", 5000);
            }, 1000);
        }
    }, []);

    //Inside your Login component, add this effect
    //If we don't have a CSRF token in the request, teh spring boot will ignore it
    useEffect(() => {

        // Look for CSRF token in the page
        fetch('/api/csrf')                    //we need this token evey time we want to send a request to the backend
            .then(response => response.json())
            .then(data => {
                // Create a hidden input for CSRF
                const form = document.querySelector('form[action="/users/login"]');
                if (form && data.token) {
                    // Remove any existing CSRF input
                    const existingCsrf = form.querySelector('input[name="_csrf"]');
                    if (existingCsrf) existingCsrf.remove();

                    // Add new CSRF input
                    const csrfInput = document.createElement('input');
                    csrfInput.type = 'hidden';
                    csrfInput.name = '_csrf';
                    csrfInput.value = data.token;
                    form.appendChild(csrfInput);    //append the CSRF element to the form
                    // we append the hidden input . when we click on submit. we submit username password and csrf token
                    //without the CSRF token, spring boot will block us
                }
            })
            .catch(error => console.error('Could not fetch CSRF token:', error));
    }, []);

    return (
        <main className="container py-4">
            <div className="form-container">
                <div className="form-icon">
                    <i className="fas fa-user-circle"></i>
                </div>

                <div className="form-header">
                    <h1 className="form-title">Welcome Back</h1>
                    <p className="form-subtitle">Sign in to access your tutoring account</p>
                </div>

                <div
                    id="login-error-alert"
                    className="alert alert-danger"
                    role="alert"
                    style={{ display: isLoginError ? 'block' : 'none' }}
                >
                    Invalid username or password. Please try again.
                </div>

                {/* Use a regular form that submits directly to Spring Security */}
                <form action="/users/login" method="POST">
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter your username. Example: user1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter your password. Example: 12345"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-submit">
                            <i className="fas fa-sign-in-alt me-2"></i> Login
                        </button>
                    </div>

                    <div className="form-footer">
                        Don't have an account? <Link to="/users/register">Sign up</Link>
                    </div>
                </form>
            </div>

            <div id="message" className="form-container" style={{ display: 'none' }}>
                <p className="form-subtitle">The username and password are prepopulated for test and presentation purpose.</p>
            </div>
        </main>
    );
}

export default Login;