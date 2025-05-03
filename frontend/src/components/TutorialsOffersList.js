import React, {useState, useEffect} from 'react';


function TutorialsOffersList({category}) {

    const [tutorials, setTutorials] = useState([]);
    const [pageTitle, setPageTitle] = useState('');
    const [pageSubtitle, setPageSubtitle] = useState('');


    useEffect(() => {

        let endpoint;

        switch (category) {
            case 'info':
                endpoint = '/api/tutorials/info';
                setPageTitle('Informatics Offers');
                setPageSubtitle('Find tutoring services for programming and computer science');
                break;

            case 'math':
                endpoint = '/api/tutorials/math';
                setPageTitle('Mathematics Offers');
                setPageSubtitle('Find tutoring services for mathematical topics');
                break;

            case 'other':
                endpoint = '/api/tutorials/other';
                setPageTitle('Other Subject Offers');
                setPageSubtitle('Explore tutoring options for various other subjects');
                break;

        }

        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Not authenticated or server error');
                }
                return response.json();     // from the response take the JSON part which is teh body
            })
            .then(data => {
                console.log(data)

                // JS knows how to put the JSON in its oun tutorials-array
                setTutorials(data);
            })
            .catch(error => {
                console.error('Error fetching tutorials:', error);
            });

    }, []);


    return (
        <main className="container py-4">

            <div className="offers-container">

                <div className="general-header">
                    <h1 className="main-title">{pageTitle}</h1>
                    <p className="general-subtitle">{pageSubtitle}</p>
                </div>

                <div className="offers-list-container">

                    <div className="offers-list">

                        {tutorials.length > 0 ? (
                            tutorials.map((tutorial) => (
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
                                <h3>No offers available</h3>
                                <p>Check back later or explore other subject areas.</p>
                            </div>
                        )}
                    </div>

                </div>

            </div>

        </main>

    );

}

export default TutorialsOffersList;