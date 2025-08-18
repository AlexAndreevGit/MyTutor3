import React, {useEffect, useState} from "react";
import {
    desctiption,
    ourMission,
    informaticsDescription,
    mathematicsDescription,
    otherSubjectsDescription
} from "./UtilsTexts";
import {Link} from "react-router-dom";


//in React components are JS functions that return JSX
function AboutUs(){

    const [users,setUsers] = useState([])

    useEffect(() => {
        //Fetch the users from the API
        fetch('/users/all')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                console.log("Fetched users:", data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const countAllUsers = users.length;


    return(
        <main className="container py-4">

            <div className="offers-container">

                <div className="stats-container">
                    <div className="stats-header">

                        <div className="stats-icon">
                            <i className="fas fa-chart-bar"></i>
                        </div>
                        <h1 className="stats-title">Platform Statistics</h1>
                        <p className="stats-subtitle">An overview of our tutoring community</p>

                    </div>

                </div>

                <div className="stats-dashboard">

                    <div className="stat-card-statistics">
                        <div className="stat-icon">
                            <i className="fas fa-users"></i>
                        </div>

                        <p className="stat-label-statistics">Registered Tutors: </p>
                        <h3 className="stat-value">{countAllUsers}</h3>

                    </div>

                </div>

                <div className="users-list-container">
                    <div className="users-list">
                        {users.map((user)=> (

                            <div key={user.id} className="users-card">

                                <div >
                                    <h3 className="user-info">Username: {user.username}</h3>
                                    <h3 className="user-info">Email: {user.email}</h3>
                                    <h3 className="user-info">Designation: {user.designation}</h3>
                                </div>

                                <div className="delete-button-container">
                                    <a href={`/users/removeByAdmin/${user.id}`}>
                                        <i className="fas fa-trash-alt"></i> Delete User
                                    </a>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>



            </div>

        </main>

    )
}

export default AboutUs;