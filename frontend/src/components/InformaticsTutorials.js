import TutorialsOffersList from "./TutorialsOffersList";

//when InformaticsTutorials2 is rendered it will show whatever TutorialsOffersList2 renders
function InformaticsTutorials() {

    //we pass a prop called category with the value "info"
    return < TutorialsOffersList category="info" />
}

export default InformaticsTutorials