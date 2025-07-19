import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {sentFormWithCSRFToURL} from "./Utils";


function MyInformation(){

    const[userInfo, setUserInfo] = useState({
        userName:'',
        userEmail:'',
        numberOfClasses:'0',
        averagePriceEUR:'0.0',
        submittedTutoringOffersAsAView:[]
        })

    useEffect(() => {
        fetch('/api/users/my-information2')
            .then(data => data.json())
            .then(result => setUserInfo(result))

    }, []);

    useEffect(() => {
        console.log('Updated userInfo:', userInfo);
    }, [userInfo]);


    function handleDeleteAccount(e) {
        e.preventDefault()

        sentFormWithCSRFToURL("/users/delete-account")
        console.log("here !!")
    }

    return(
        <main className="container py-4" style={{maxWidth: "900px"}}>

            {/*icon, username, email*/}
            <div className="div-main" style={{ textAlign: 'center' }}>
                    <div className="profile-avatar">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <h1 className="profile-title">{userInfo.userName}</h1>
                    <p className="profile-subtitle">{userInfo.userEmail}</p>
            </div>

            {/*number of classes*/}
            <div className="div-main" style={{ display: "flex", gap: "1rem" }}>
                <div className="stat-card" style={{ flex: 1 }}>
                    <div className="stat-icon">
                        <i className="fas fa-book"></i>
                    </div>
                    <div className="stat-content">
                        <h3 className="stat-value">{userInfo.numberOfClasses}</h3>
                        <p className="stat-label">Classes</p>
                    </div>
                </div>

                <div className="stat-card" style={{ flex: 1 }}>
                    <div className="stat-icon">
                        <i className="fas fa-euro-sign"></i>
                    </div>
                    <div className="stat-content">
                        <h3 className="stat-value">{userInfo.averagePriceEUR}</h3>
                        <p className="stat-label">Avg. Price (EUR)</p>
                    </div>
                </div>
            </div>

            {/*tutorials list*/}
            <div className="div-main">
                <div className="section-header">
                    <h2 className="section-title">
                        My Tutoring Offers
                    </h2>

                    <Link to="/tutorials/add" className="btn-action secondary">
                        <i className="fas fa-plus-circle" style={{ marginRight: "0.5rem" }}></i>Add New Offer
                    </Link>
                </div>

                <div className="offers-list">
                    {userInfo.submittedTutoringOffersAsAView.length > 0 ? (
                        userInfo.submittedTutoringOffersAsAView.map((offer) => (
                            <div key={offer.id} className="user-offer-card">
                                <div className="offer-card-header">
                                    <h3 className="offer-name">{offer.name}</h3>
                                    <div className="offer-price">
                                        <span>{offer.price}</span>
                                        <span className="price-currency">EUR</span>
                                    </div>
                                </div>

                                <div className="offer-description">
                                    <p>{offer.description}</p>
                                </div>

                                <div className="offer-actions">
                                    <a
                                        className="btn-delete"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (window.confirm('Are you sure you want to remove this offer?')) {
                                                window.location.href = `/tutorials/remove/${offer.id}`;  //window.location.href is the current address of the page. Assigning a new value to it causes the browser to navigate to that URL
                                            }
                                        }}
                                    >
                                        <i className="fas fa-trash-alt" style={{marginRight: '8px'}}></i> Remove
                                    </a>
                                </div>

                            </div>
                        ))) : (
                        <div className="no-offers">
                            <i className="fas fa-search fa-3x mb-3"></i>
                            <h3>No tutoring offers available</h3>
                            <p>Add a new tutoring offer to get started.</p>
                        </div>
                    )}
                </div>

            </div>

            {/*delate accont*/}
            <div className="div-main"
                 style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1rem"}}>
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

        </main>
    )


}

export default MyInformation;