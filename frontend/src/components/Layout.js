import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Footer from './Footer';
import Header from "./Header";


function Layout({children, isAuthenticated, isAdmin}) {


    const handleLogout = (e) => {
        e.preventDefault();

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

            <main className="main-content">
                {children}
            </main>

            <Footer/>
        </>
    );
}

export default Layout;