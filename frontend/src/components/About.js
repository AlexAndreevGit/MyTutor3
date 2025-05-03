import React from 'react';

function About() {
    return (
        <main className="container py-4">

            {/*Test comment2*/}
            <div className="div-main">
                    <div className="col-lg-12">
                            <h1 className="about-title">About Us</h1>
                            <p className="about-description">
                                MyTutor is a platform connecting students with peer tutors to facilitate
                                learning and academic success. We bring together those who need help with
                                specific subjects and those who have mastered those subjects and want to
                                share their knowledge.
                            </p>
                </div>
            </div>

            <div className="div-main purple-background" >
                <div className="mission-content">
                    <div className="mission-icon">
                        <i className="fas fa-graduation-cap"></i>
                    </div>
                    <p className="mission-text">
                        Our mission is to make education more accessible by creating a community
                        where students can find the help they need and tutors can share their expertise.
                    </p>
                </div>
            </div>

            <div className="subjects-section">

                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="subject-card">
                            <div className="subject-icon">
                                <i className="fas fa-laptop-code"></i>
                            </div>
                            <h3 className="subject-title">Informatics</h3>
                            <p className="subject-description">
                                Find tutors specializing in programming, computer science, algorithms,
                                data structures, and more.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="subject-card">
                            <div className="subject-icon">
                                <i className="fas fa-square-root-alt"></i>
                            </div>
                            <h3 className="subject-title">Mathematics</h3>
                            <p className="subject-description">
                                Get help with algebra, calculus, statistics, discrete mathematics,
                                and other math subjects.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="subject-card">
                            <div className="subject-icon">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <h3 className="subject-title">Other Subjects</h3>
                            <p className="subject-description">
                                Find tutoring in physics, chemistry, biology, economics, and many
                                other academic fields.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}

export default About;