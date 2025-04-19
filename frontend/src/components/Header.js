import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ isAuthenticated, isAdmin, handleLogout }) {
    // const navigate = useNavigate();

    return (
        <header>

            <nav className="navbar navbar-expand-lg navbar-light modern-navbar">
                <Link className="navbar-brand" to="/home">
                    <i className="fas fa-chalkboard-teacher brand-icon"></i>
                    <span className="brand-text">MyTutor</span>
                </Link>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link-button" to="/home">
                            <i className="fas fa-home nav-icon"></i> Home
                        </Link>
                    </li>

                    {/* The content of the li tag will be shown only if the first condition (isAuthenticated) is true*/}
                    {isAuthenticated && (
                        // Empty element because in react we need to have only one parent element and teh other elements are children of this element.
                        <>
                            <li className="nav-item">
                                <Link className="nav-link-button" to="/tutorials/add">
                                    <i className="fas fa-plus-circle nav-icon"></i> Add Offer
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link-button" to="/tutorials/info">
                                    <i className="fas fa-laptop-code nav-icon"></i> Informatics
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link-button" to="/tutorials/math">
                                    <i className="fas fa-square-root-alt nav-icon"></i> Mathematics
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link-button" to="/tutorials/other">
                                    <i className="fas fa-chart-line nav-icon"></i> Other subjects
                                </Link>
                            </li>
                        </>
                    )}

                    {isAdmin && (
                        <li className="nav-item">
                            <Link className="nav-link-button" to="/admin/statistics">
                                <i className="fas fa-chart-bar nav-icon"></i> Statistics
                            </Link>
                        </li>
                    )}

                    <li className="nav-item">
                        <Link className="nav-link-button" to="/about-us">
                            <i className="fas fa-info-circle nav-icon"></i> About Us
                        </Link>
                    </li>

                    {isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link-button" to="/tutorials/ask-question">
                                    <i className="fas fa-robot nav-icon"></i> TutorBot
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link-button" to="/users/my-information">
                                    <i className="fas fa-user nav-icon"></i> My Information
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                <div className="d-flex">
                    <ul className="navbar-nav">
                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="btn-login" to="/users/login">
                                        <i className="fas fa-sign-in-alt nav-icon"></i> Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="btn-register" to="/users/register">
                                        <i className="fas fa-user-plus nav-icon"></i> Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="btn-logout" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt nav-icon"></i> Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>

        </header>
    );
}

export default Header;