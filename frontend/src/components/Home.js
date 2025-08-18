import React, {useEffect, useState} from "react";
// import Home from "./Home";
import {Link} from "react-router-dom";

function Home(){

    //we use the useState hook to manage the state of the Home component
    //we add state to functional components
    //the status contains three properties all set to 0
 const [status,setStatus] = useState({
     countInformaticsTutorials: 0,
     countMathematicsTutorials: 0,
     countOtherTutorials: 0,
     }
 )
    //useEffect(() => {}, []);
    //useEffect is a React hook. We used it to fetch data
    //we can obsererve it as a function with two arguments
    //the first argument: () => {} is a function that will be executed after the component is mounted
    //the second argument: [] is an array of dependencies. If the array is empty, the function will be executed only once, when the component is mounted

    useEffect(() => {
        fetch('/api/home-stats') //send a GET request to the server
            .then(response => response.json())  // from the response take the JSON part which is the body
            .then(data => {
                console.log(data)
                setStatus(data)

            })
    }, []);

    const totalTutoringOffers = status.countInformaticsTutorials + status.countMathematicsTutorials + status.countOtherTutorials;

    return(
        <main className="container py-4">

            <div className="div-main">
                <div className="stats-header-home">
                    <h1 className="stats-header-home">Welcome to MyTutor 3</h1>
                </div>

                <div className="div-home-two-boxes">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-book-open"></i>
                        </div>
                        <h3 className="feature-title">Find the perfect tutor for you</h3>
                        <p className="feature-text">Connect with knowledgeable tutors who specialize in Informatics,
                            Mathematics,
                            and other disciplines to help you master challenging concepts.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-chalkboard-teacher"></i>
                        </div>
                        <h3 className="feature-title">Submit your own tutoring offer</h3>
                        <p className="feature-text">If you already have advanced knowledge in the areas of Informatics,
                            Mathematics,
                            or any other discipline, you can submit your offer and be contacted by other students.</p>
                    </div>

                </div>
            </div>

            <div className="div-main">
                <div className="stats-header">
                    <h1 className="main-title">An overview of our tutoring offers</h1>
                </div>

                <div className="stats-dashboard">

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-desktop"></i>
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{status.countInformaticsTutorials}</h3>
                            <p className="stat-label">Informatics Offers</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-square-root-alt"></i>
                        </div>
                        <div className="stat-content">
                        <h3 className="stat-value">{status.countMathematicsTutorials}</h3>
                            <p className="stat-label">Mathematics Offers</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{status.countOtherTutorials}</h3>
                            <p className="stat-label">Other Offers</p>
                        </div>
                    </div>

                </div>

                <div className="stats-summary">

                    <div className="summary-content">
                        <h3 className="summary-title">
                            <i className="fas fa-graduation-cap me-2"></i>
                            Total Tutoring Offers:
                            <div className="sum-tutoring-offers">{totalTutoringOffers}</div>
                        </h3>
                    </div>

                    <div className="summary-chart">
                        <div
                        className="chart-segment informatics"
                        style={{
                         width: `${status.countInformaticsTutorials * 100 / (totalTutoringOffers || 1)}%`
                        }}
                        >
                        </div>
                        <div
                            className="chart-segment mathematics"
                            style={{
                                width: `${status.countMathematicsTutorials * 100 / (totalTutoringOffers || 1)}%`
                            }}
                        >
                        </div>
                        <div
                            className="chart-segment datascience"
                            style={{
                                width: `${status.countOtherTutorials * 100 / (totalTutoringOffers || 1)}%`
                            }}
                        >
                        </div>
                    </div>


                </div>
            </div>

            <div className="div-main">
            <h1 className="main-title" style={{textAlign: 'center'}}>Get Started Today</h1>
                <p className="main-text" style={{textAlign: 'center'}}>
                    Join our tutoring platform to find expert help or offer your teaching services.
                </p>

                <div className="picture-section-actions">
                    <Link to="/users/login" className="btn-login">
                    <i className="fas fa-sign-in-alt nav-icon"></i> Login
                    </Link>

                    <Link to="/users/register" className="btn-register">
                        <i className="fas fa-user-plus nav-icon"></i> Register
                    </Link>
                </div>
            </div>

        </main>

    )

}

export default Home