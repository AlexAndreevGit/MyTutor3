import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {addCsrfTokenToForm} from "./Utils";


function Login() {
    const [username, setUsername] = useState('user1');
    const [password, setPassword] = useState('12345');

    const location = useLocation();  //      the method useLocations() holds the current URL
    const isLoginError = location.pathname === '/users/login-error';


    useEffect(() => {

        const popup = document.getElementById("message")

        if (popup) {
            setTimeout(() => {
                popup.style.display = "block";
                setTimeout(() => popup.style.display = "none", 5000);
            }, 1000);
        }

    }, []);


    useEffect(() => {

        addCsrfTokenToForm("loginFormID");

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
                    className="alert alert-danger"    // "alert alert-danger": These are two Bootstrap CSS classes.
                    // role="alert"
                    style={{display: isLoginError ? 'block' : 'none'}}
                >
                    Invalid username or password. Please try again.
                </div>

                <form id='loginFormID' action="/users/login" method="POST">
                    <div className="form-group">

                        <label className="form-label">Username</label>

                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required

                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
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

            <div id="message" className="form-container" style={{display: 'none'}}>
                <p className="form-subtitle">The username and password are prepopulated for test and presentation
                    purpose.</p>
            </div>

        </main>
    );

}

export default Login;