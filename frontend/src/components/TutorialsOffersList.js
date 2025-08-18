import React, {useEffect, useState} from "react";

//A functional component used in another components to display a list of tutoring offers based on the category passed as a probe
//category is in {} because it is a probe passed by the parent component
function TutorialsOffersList ({category}){

    const [offersListOriginal,setOffersListOriginal] = useState([])
    const [offersListCopy,setOffersListCopy] = useState([])

    const [pageTitle,setPageTitle] = useState('')
    const [pageSubTitle,setPageSubTitle] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {

        let endpoint

        switch (category) {
            case "info":
                setPageTitle('Informatics Offers')
                setPageSubTitle('Find tutoring services for programming and computer science')
                endpoint = '/api/tutorials/info'
                break;

            case "math":
                setPageTitle('Mathematics Offers')
                setPageSubTitle('Find tutoring services for mathematical topics')
                endpoint = '/api/tutorials/math'
                break;

            case "other":
                setPageTitle('Other Subject Offers')
                setPageSubTitle('Explore tutoring options for various other subjects')
                endpoint = '/api/tutorials/other'
                break;
        }

        //setOffersList and offersListFilter to data
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                setOffersListOriginal(data)
                setOffersListCopy(data);
            })


    }, []);


    const handleSearch = (event) => {
        console.log("here1")
        event.preventDefault();
        const searchUrl= `/tutorials/informaticsFind?searchTerm=${encodeURIComponent(searchTerm)}`

        console.log("here2")
        //window.location.href=searchUrl

        const tempOffersList = [...offersListOriginal];

        const filteredOffers = tempOffersList.filter(offer =>
            offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offer.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setOffersListCopy(filteredOffers);

    }

    useEffect(() => {
        console.log("searchTerm",searchTerm)
        console.log("OL",offersListOriginal)
        console.log("OLF",offersListCopy)
    }, [searchTerm]);


    function handleSort(sort) {
        let sortOffersTemp= [...offersListCopy]

        if(sort === 'alphabetical') {
            sortOffersTemp.sort((a, b) => a.name.localeCompare(b.name));
        }
        if(sort === 'date'){
            sortOffersTemp.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
        }

        setOffersListCopy(sortOffersTemp);

    }

    return(
        <main className="container py-4">
            <div className="offers-container">
                <div className="general-header">
                    <h1 className="main-title">{pageTitle}</h1>
                    <p className="general-subtitle">{pageSubTitle}</p>
                </div>



                <div className="div-search-bar" style={{display:"flex", gap:"10px"}}>
                    <form onSubmit={handleSearch} style={{display:"flex", width:"100%"}}>
                        <div class="input-group">
                            <input  type="text"
                                    className="form-control"
                                    name="searchTerm"
                                    placeholder="Search for informatics offers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            <button className="btn-action primary" type="submit" style = {{marginLeft:"10px"}}>Search</button>

                        </div>
                    </form>

                    <div className="dropdown">
                        <button className="btn-action primary dropdown-toggle" type="button" id="sortingDropdown"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-sort"></i> Sorting method
                        </button>

                        <div className="dropdown-menu" aria-labelledby="sortingDropdown">
                            <a class="dropdown-item" onClick={()=> handleSort('alphabetical')}>
                                Sort alphabetically (ascending)
                            </a>
                            <a class="dropdown-item" onClick={()=> handleSort('date')}>
                                Sort by date (descending)
                            </a>
                        </div>

                    </div>

                </div>


                <div className="offers-list-container">

                    <div className="offers-list">
                        {offersListCopy?.length > 0 ? (
                            offersListCopy.map((offer) => (
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

                                        <div className="offer-footer">
                                            <div className="offer-tutor">
                                                <i className="fas fa-user-graduate me-2"></i>
                                                <a href="#" className="tutor-email">{offer.emailOfTheTutor}</a>

                                                <i className="fas fa-calendar-alt me-2"
                                                   style={{marginLeft: '1rem'}}></i>
                                                <a>{offer.createdOn}</a>
                                            </div>
                                        </div>

                                    </div>

                                ))) : (
                                <div>
                                    <i className="fas fa-search fa-3x mb-3"></i>
                                    <h3>No tutoring offers available</h3>
                                    <p>Add a new tutoring offer to get started. </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
        </main>
)

}

export default TutorialsOffersList