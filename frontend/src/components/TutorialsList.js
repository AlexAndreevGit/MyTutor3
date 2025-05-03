import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TutorialsList({ category }) {
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let endpoint;
        let title;
        let subtitle;

        switch(category) {
            case 'info':
                endpoint = '/api/tutorials/info';
                title = 'Informatics Offers';
                subtitle = 'Find tutoring services for programming and computer science';
                break;
            case 'math':
                endpoint = '/api/tutorials/math';
                title = 'Mathematics Offers';
                subtitle = 'Find tutoring services for mathematical topics';
                break;
            case 'other':
                endpoint = '/api/tutorials/other';
                title = 'Other Subject Offers';
                subtitle = 'Explore tutoring options for various other subjects';
                break;
            default:
                endpoint = '/api/tutorials/info';
                title = 'Tutoring Offers';
                subtitle = 'Find the perfect tutor for your needs';
        }

        // Fetch the tutorials data
        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Not authenticated or server error');
                }
                return response.json();
            })
            .then(data => {
                setTutorials(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tutorials:', error);
                setLoading(false);
            });
    }, [category]);

    // Determine title and subtitle based on category
    let pageTitle;
    let pageSubtitle;

    // TODO remove second switch case
    switch(category) {
        case 'info':
            pageTitle = 'Informatics Offers';
            pageSubtitle = 'Find tutoring services for programming and computer science';
            break;
        case 'math':
            pageTitle = 'Mathematics Offers';
            pageSubtitle = 'Find tutoring services for mathematical topics';
            break;
        case 'other':
            pageTitle = 'Other Subject Offers';
            pageSubtitle = 'Explore tutoring options for various other subjects';
            break;
        default:
            pageTitle = 'Tutoring Offers';
            pageSubtitle = 'Find the perfect tutor for your needs';
    }

    return (
        <main className="container py-4">
            <div className="offers-container">
                <div className="general-header">
                    <h1 className="main-title">{pageTitle}</h1>
                    <p className="general-subtitle">{pageSubtitle}</p>
                </div>

                <div className="offers-list-container">
                    <div className="offers-list">
                        {loading ? (
                            <div className="text-center p-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : tutorials.length > 0 ? (
                            tutorials.map(tutorial => (
                                <div key={tutorial.id} className="offer-card">
                                    <div className="offer-card-content">
                                        <div className="offer-header">
                                            <h4 className="offer-title">{tutorial.name}</h4>
                                            <div className="offer-price">
                                                <span>{tutorial.price}</span>
                                                <span> EUR </span>
                                                <span className="price-per">per hour</span>
                                            </div>
                                        </div>

                                        <div className="offer-body">
                                            <p className="offer-description">{tutorial.description}</p>
                                        </div>

                                        <div className="offer-footer">
                                            <div className="offer-tutor">
                                                <i className="fas fa-user-graduate me-2"></i>
                                                <a href={`mailto:${tutorial.emailOfTheTutor}`} className="tutor-email">
                                                    {tutorial.emailOfTheTutor}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-offers">
                                <i className="fas fa-search fa-3x mb-3"></i>
                                <h3>No {category === 'info' ? 'informatics' : category === 'math' ? 'mathematics' : 'other subject'} offers available</h3>
                                <p>Check back later or explore other subject areas.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default TutorialsList;