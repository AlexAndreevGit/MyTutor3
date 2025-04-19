import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Every react app will have an index.js file.
// This is the entry point of the application. It will be the first file to be executed when the application is started.
// the palace where we initialize the virtual DOM. ".createRoot" is a method that create the Root(first node) of the virtual DOM."
// After the root we have a tree of nodes.
const root = ReactDOM.createRoot(document.getElementById('root')); //create the root and put it in the div with id "root" from the index.html file.

//render the App
root.render(
    // "React.StrictMode" Mechanic in react that helps us find bugs in the code.
    <React.StrictMode>
        <App />
    </React.StrictMode>
);