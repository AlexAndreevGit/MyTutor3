import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';


// const root = ReactDOM.createRoot(document.getElementById('root')); //we assigning the created root to a variable called root
//
// //render the App by calling the function .render() on the variable. app will ber rendered in to the DOM
// root.render(
//     // "React.StrictMode" Mechanic in react that helps us find bugs in the code.
//     //<React.StrictMode>
//         <App />  //this is the main component App.js. It is the entry point of the React component tree
//     //</React.StrictMode>
// );

//we assign the created root to a variable called root
const root = ReactDOM.createRoot(document.getElementById('root'))

//the app is rendered by colling a function .render() on the variable.
root.render(
    <App/>  //this is the main component App.js. It is the ent point of the React component tree
)