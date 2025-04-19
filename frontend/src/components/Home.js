import React, { useState, useEffect } from 'react';     //import two hooks from react
import { Link } from 'react-router-dom';

function Home() {

    //hook to manage the state of the statistics
    const [stats, setStats] = useState({    //object stats with 4 fields/parameters
        countInformaticsTutorials: 0,
        countMathematicsTutorials: 0,
        countOtherTutorials: 0,
        countAllUsers: 0
    });

    //hook to fetch the statistics from the backend
    useEffect(() => {
        // Fetch stats from your API endpoint
        fetch('/api/home-stats')
            .then(response => response.json())
            .then(data => {
                setStats(data);
            })
            .catch(error => {
                console.error('Error fetching stats:', error);
            });
    }, []);


    return (
        <main className="container py-4">
            {/* Welcome Section */}
            <div className="div-main">
                <div className="stats-header-home">
                    <h1 className="main-title">Welcome to MyTutor</h1>
                </div>

                <div className="div-home-two-boxes">

                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-book-open"></i>
                        </div>
                        <h3 className="feature-title">Find the perfect tutor for you</h3>
                        <p className="feature-text">Connect with knowledgeable tutors who specialize in Informatics, Mathematics,
                            and other disciplines to help you master challenging concepts.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-chalkboard-teacher"></i>
                        </div>
                        <h3 className="feature-title">Submit your own tutoring offer</h3>
                        <p className="feature-text">If you already have advanced knowledge in the areas of Informatics, Mathematics,
                            or any other discipline, you can submit your offer and be contacted by other students.</p>
                    </div>

                </div>
            </div>

            {/* Stats Section */}
            <div className="div-main">
                <div className="stats-header">
                    <h1 className="main-title">An overview of our tutoring offers</h1>
                </div>

                <div className="stats-dashboard">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-laptop-code"></i>
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{stats.countInformaticsTutorials}</h3>
                            <p className="stat-label">Informatics Offers</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-square-root-alt"></i>
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{stats.countMathematicsTutorials}</h3>
                            <p className="stat-label">Mathematics Offers</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{stats.countOtherTutorials}</h3>
                            <p className="stat-label">Other Offers</p>
                        </div>
                    </div>
                </div>

                {/* Chart Summary */}
                <div className="stats-summary">
                    <div className="summary-content">
                        <h3 className="summary-title">
                            <i className="fas fa-graduation-cap me-2"></i>
                            Total Tutoring Offers:
                            <span className="sum-tutoring-offers">
                {stats.countInformaticsTutorials + stats.countMathematicsTutorials + stats.countOtherTutorials}
              </span>
                        </h3>
                    </div>

                    <div className="summary-chart">
                        <div
                            className="chart-segment informatics"
                            style={{
                                width: `${stats.countInformaticsTutorials * 100 /
                                (stats.countInformaticsTutorials + stats.countMathematicsTutorials + stats.countOtherTutorials || 1)}%`
                            }}
                        ></div>
                        <div
                            className="chart-segment mathematics"
                            style={{
                                width: `${stats.countMathematicsTutorials * 100 /
                                (stats.countInformaticsTutorials + stats.countMathematicsTutorials + stats.countOtherTutorials || 1)}%`
                            }}
                        ></div>
                        <div
                            className="chart-segment datascience"
                            style={{
                                width: `${stats.countOtherTutorials * 100 /
                                (stats.countInformaticsTutorials + stats.countMathematicsTutorials + stats.countOtherTutorials || 1)}%`
                            }}
                        ></div>
                    </div>

                    <div className="chart-legend">
                        <div className="legend-item">
                            <span className="legend-color informatics"></span>
                            <span className="legend-label">Informatics</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color mathematics"></span>
                            <span className="legend-label">Mathematics</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color datascience"></span>
                            <span className="legend-label">Data Science</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="div-main">

                <h1 className="main-title" style={{textAlign: 'center'}}>Get Started Today</h1>
                <p className="feature-text" style={{textAlign: 'center'}}>
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
    );
}

export default Home;