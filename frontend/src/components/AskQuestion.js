import React, { useEffect, useState } from 'react';

function AskQuestion() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    // Fetch the CSRF token and inject it into the form like in Login.js
    useEffect(() => {
        fetch('/api/csrf')
            .then(res => res.json())
            .then(data => {
                const form = document.querySelector('form[action="/tutorials/ask-question"]');
                if (form && data.token) {
                    // Remove existing CSRF input if any
                    const existing = form.querySelector('input[name="_csrf"]');
                    if (existing) existing.remove();

                    // Add new hidden CSRF input
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = '_csrf';
                    input.value = data.token;
                    form.appendChild(input);
                }
            })
            .catch(err => console.error('Could not fetch CSRF token:', err));
    }, []);

    const handleResponse = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        fetch('/tutorials/ask-question', {
            method: 'POST',
            body: JSON.stringify({ query: formData.get('query') }),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': formData.get('_csrf') // exact same trick as login form
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.answer)
                setAnswer(data.answer);
            })
            .catch(err => {
                console.error('Failed to ask question:', err);
                setAnswer('Oops, something went wrong.');
            });
    };

    return (
        <main className="container py-4">
            <div className="general-header">
                <h1 className="main-title">Ask TutorBot</h1>
                <p className="general-subtitle">Ask the TutorBot any question!</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form className="form-group-ask-question" action="/tutorials/ask-question" onSubmit={handleResponse}>
                        <input
                            type="text"
                            className="form-control"
                            style={{ marginRight: '5px' }}
                            name="query"
                            placeholder="Enter Your Question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <button type="submit" className="btn-submit">Ask</button>
                    </form>

                    {answer && (
                        <div id="resultsOuterContainer" className="answer-chatbot-container">
                            <div className="offers-list" id="searchResults">
                                <div className="answer-box">{answer}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default AskQuestion;
