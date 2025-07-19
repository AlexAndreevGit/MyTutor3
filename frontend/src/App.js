import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import InformaticsTutorials from './components/InformaticsTutorials';
import MathTutorials from './components/MathTutorials';
import OtherTutorials from './components/OtherTutorials';
import TutorialAdd from './components/TutorialAdd';
import AskGPTQuestion from "./components/AskGPTQuestion";
import MyInformation from "./components/MyInformation";


function AppContent() {


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    const checkAuthStatus = () => {
        fetch('/api/auth/status')
            .then(response => response.json())
            .then(data => {
                setIsAuthenticated(data.authenticated);
                if (data.roles && data.roles.includes('ROLE_ADMIN')) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            })
            .catch(error => {
                console.error('Error checking authentication status:', error);
                setIsAuthenticated(false);
                setIsAdmin(false);
            });
    };


    useEffect(() => {
        checkAuthStatus();
    }, [location]);

    return (

        <Layout isAuthenticated={isAuthenticated} isAdmin={isAdmin}>


            {/*Routes is a routing library.*/}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about-us" element={<About />} />

                <Route path="/users/login" element={<Login />} />
                <Route path="/users/login-error" element={<Login />} />
                <Route path="/users/register" element={<Register />} />
                <Route path="/users/my-information" element={<MyInformation />} />

                <Route path="/tutorials/info" element={<InformaticsTutorials />} />
                <Route path="/tutorials/math" element={<MathTutorials />} />
                <Route path="/tutorials/other" element={<OtherTutorials />} />
                <Route path="/tutorials/add" element={<TutorialAdd />} />
                <Route path="/tutorials/ask-question" element={<AskGPTQuestion/>}/>

            </Routes>
        </Layout>
    );
}


function App() {
    return (
        //BrowserRouter is a module in React handling the routing
        <BrowserRouter>
            <div className="app-wrapper">
                <AppContent />
            </div>
        </BrowserRouter>
    );
}

export default App;