import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Footer from './Footer';
import Header from "./Header";
import {sentFormWithCSRFToURL} from "./Utils";


function Layout({children, isAuthenticated, isAdmin}) {


    const handleLogout = (e) => {
        e.preventDefault();

        sentFormWithCSRFToURL('/users/logout')
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