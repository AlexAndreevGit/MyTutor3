import React from 'react';

function Footer() {
    return (
        <footer className="modern-footer">

            <div className="container">
                <div className="footer-content">
                    <div>
                        <h4 className="footer-title">MyTutor</h4>
                        <p className="footer-text">
                            MyTutor connects students in need of tutoring with peers ready to share their knowledge and skills.
                        </p>
                    </div>

                    <div>
                        <h4 className="footer-title">Services</h4>
                        <div className="footer-links">
                            <p className="footer-text">Submit a tutoring offer</p>
                            <p className="footer-text">Find your perfect tutor</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-title">Contact</h4>
                        <ul className="footer-contact">
                            <li><i className="fas fa-map-marker-alt"></i> Berlin, Ribbeckerstr 30 10319</li>
                            <li><i className="fas fa-envelope"></i> MyTutorInfo@gmail.com</li>
                            <li><i className="fas fa-phone"></i> + 01 264 163 38</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 MyTutor. All rights reserved.</p>
                </div>
            </div>

        </footer>
    );
}

export default Footer;