import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Footer from './Footer';
import Header from "./Header";


function Layout({children, isAuthenticated, isAdmin}) {
    // const navigate = useNavigate();

    // Create logout form with CSRF token
    const handleLogout = (e) => {
        e.preventDefault();

        // Create a direct form submission to Spring Security's logout endpoint
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/users/logout';

        // Add CSRF token if available
        fetch('/api/csrf')
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    const csrfInput = document.createElement('input');
                    csrfInput.type = 'hidden';
                    csrfInput.name = data.parameterName;
                    csrfInput.value = data.token;
                    form.appendChild(csrfInput);

                    // Submit the form
                    document.body.appendChild(form);
                    form.submit();
                }
            })
            .catch(error => {
                console.error('Could not fetch CSRF token for logout:', error);
            });
    };

    return (
        <>

            <Header isAuthenticated={isAuthenticated} isAdmin={isAdmin} handleLogout={handleLogout}/>

            {/*The component that is currently loaded.*/}
            <main className="main-content">
                {children}
            </main>

            <Footer/>
        </>
    );
}

export default Layout;