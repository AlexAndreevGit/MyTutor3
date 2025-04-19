import React from 'react';
import TutorialsList from './TutorialsList';
import TutorialsOffersList from "./TutorialsOffersList";

// function MathTutorials() {
//     // passing a prop named "category" with the value "math" to the component "TutorialsList" component
//     return <TutorialsList category="math" />;
// }
//
// export default MathTutorials;

function MathTutorials(){

    //pass the prop "category" with the value "math" to the component "TutorialsList"
    return <TutorialsOffersList category="math"/>
}

export default MathTutorials;
