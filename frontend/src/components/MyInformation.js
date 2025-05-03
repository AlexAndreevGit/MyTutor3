import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyInformation() {
  const [userInfo, setUserInfo] = useState({   //object userInfo with 6 fields/parameters
    userName: '',
    userEmail: '',
    numberOfClasses: 0,
    averagePriceEUR: '0.00',
    averagePriceBGN: '0.00',
    submittedByMeTutorialsAsView: []
  });

  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch user information and tutorials
    fetch('/api/users/my-information')
        .then(response => {
          if (!response.ok) {
            throw new Error('Not authenticated or server error');
          }
          return response.json();
        })
        .then(data => {
          setUserInfo(data);

        })
        .catch(error => {
          console.error('Error fetching user information:', error);

        });

    // Fetch CSRF token
    fetch('/api/csrf')
        .then(response => response.json())
        .then(data => {
          setCsrfToken(data.token);
        })
        .catch(error => console.error('Could not fetch CSRF token:', error));
  }, []);

  const handleDeleteAccount = (e) => {
    e.preventDefault();

    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Create a form for submission
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/users/delete-account';

      // Add CSRF token
      if (csrfToken) {
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_csrf';
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);
      }

      // Submit the form
      document.body.appendChild(form);
      form.submit();
    }
  };

  return (
      <main className="container py-4">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <h1 className="profile-title">{userInfo.userName}</h1>
            <p className="profile-subtitle">{userInfo.userEmail}</p>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-book"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{userInfo.numberOfClasses}</h3>
                <p className="stat-label">Classes</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-euro-sign"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{userInfo.averagePriceEUR} EUR</h3>
                <p className="stat-label">Avg. Price (EUR)</p>
              </div>
            </div>

            {/*<div className="stat-card">*/}
            {/*  <div className="stat-icon">*/}
            {/*    <i className="fas fa-money-bill-wave"></i>*/}
            {/*  </div>*/}
            {/*  <div className="stat-content">*/}
            {/*    <h3 className="stat-value">{userInfo.averagePriceBGN} Leva</h3>*/}
            {/*    <p className="stat-label">Avg. Price (BGN)</p>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>

          <div className="offers-list-container">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-clipboard-list me-2"></i>
                My Tutoring Offers
              </h2>

              <Link to="/tutorials/add" className="btn-action secondary">
                <i className="fas fa-plus-circle"></i> Add New Offer
              </Link>
            </div>

            <div className="offers-list">
              {userInfo.submittedByMeTutorialsAsView.length > 0 ? (
                  userInfo.submittedByMeTutorialsAsView.map(tutorial => (
                      <div key={tutorial.id} className="user-offer-card">
                        <div className="offer-card-header">
                          <h3 className="offer-name">{tutorial.name}</h3>
                          <div className="offer-price">
                            <span>{tutorial.price}</span>
                            <span className="price-currency">EUR</span>
                          </div>
                        </div>

                        <div className="offer-description">
                          <p>{tutorial.description}</p>
                        </div>

                        <div className="offer-actions">
                          <a
                              className="btn-delete"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.confirm('Are you sure you want to remove this offer?')) {
                                  window.location.href = `/tutorials/remove/${tutorial.id}`;   //this will hit the spring controler that will delate the tutorial
                                }
                              }}
                          >
                            <i className="fas fa-trash-alt" style={{marginRight: '8px'}}></i> Remove
                          </a>
                        </div>
                      </div>
                  ))
              ) : (
                  <div className="no-offers">
                    <i className="fas fa-search fa-3x mb-3"></i>
                    <h3>No tutoring offers available</h3>
                    <p>Add a new tutoring offer to get started.</p>
                  </div>
              )}
            </div>
          </div>

          <div className="div-home" style={{display: 'flex', alignItems: 'center', padding: '1rem 1rem'}}>
            <p className="subject-description" style={{paddingTop: '1.2rem'}}>
              Account termination is permanent and cannot be undone.
            </p>

            <button
                className="button-delete-account"
                onClick={handleDeleteAccount}
            >
              <i className="fas fa-trash-alt" style={{marginRight: '8px'}}></i> Delete account
            </button>
          </div>
        </div>
      </main>
  );
}

export default MyInformation;