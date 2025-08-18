import React from "react";
import {
    desctiption,
    ourMission,
    informaticsDescription,
    mathematicsDescription,
    otherSubjectsDescription
} from "./UtilsTexts";


//in React components are JS functions that return JSX
function AboutUs(){

    return(
        <main className="container py-4">

            <div className="div-main">
                <div className="col-lg-12">
                    <h1 className="about-title">About Us</h1>
                    <p className="about-description">
                        {desctiption}
                    </p>
                </div>
            </div>

            <div className="div-main purple-background">
                <div className="mission-content">
                    <div className="mission-icon">
                        <i className="fas fa-graduation-cap"></i>
                    </div>
                    <p className="mission-text">
                        {ourMission}
                    </p>
                </div>
            </div>

            {/*Checkboxen zur Auswahl einfügen*/}
            <div className="div-main">
                <div className="checkbox-section">
                    <h3>Select Options:</h3>
                    <div>
                        <label>
                            <input type="checkbox" name="optionA" value="TestA"/> TestA
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="optionB" value="TestB"/> TestB
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="optionC" value="TestC"/> TestC
                        </label>
                    </div>
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
                                {informaticsDescription}
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
                                {mathematicsDescription}
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
                                {otherSubjectsDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </main>


    )

}

export default AboutUs;