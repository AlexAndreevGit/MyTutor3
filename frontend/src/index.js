import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';


const root = ReactDOM.createRoot(document.getElementById('root')); //create the root and put it in the div with id "root" from the index.html file.

//render the App
root.render(
    // "React.StrictMode" Mechanic in react that helps us find bugs in the code.
    <React.StrictMode>
        <App />
    </React.StrictMode>
);