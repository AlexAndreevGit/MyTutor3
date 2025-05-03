import React, {useEffect, useState} from "react";

function AskGPTQuestion() {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');


    useEffect(() => {
        fetch('/api/csrf')
            .then(response => response.json())
            .then(data => {
                console.log(data)

                const form = document.getElementById('askQustionForm');

                if (form && data.token) {
                    //output a message in the console
                    console.log('CSRF token fetched successfully');

                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = '_csrf';
                    input.value = data.token;
                    form.appendChild(input)
                }
            })

    }, []);


    //the event has some default information. event.target - which html element started the event
    function handleResponse(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const requestBody = JSON.stringify({query: formData.get('query')});
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        // }

        fetch('/tutorials/ask-question', {
            method: 'POST',
            body: requestBody,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': formData.get('_csrf')
            }

        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAnswer(data.answer)
            }).catch(err => {
            console.error("Failed to ask question", err);
            setAnswer('Oops, something went wrong');
        });


    }

    return (
        <main className="container py-4">
            <div className="div-main-transparen">
                <h1 className="main-title" style={{textAlign: 'center'}}>Ask TutorBot</h1>
                <p className="general-subtitle" style={{textAlign: 'center'}}>Ask the TutorBot any question!</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8" style={{display: 'flex', justifyContent: 'center'}}>

                    <form id="askQustionForm" className="form-group-ask-question" onSubmit={handleResponse}>

                        <input
                            type="text"
                            className="form-control"
                            name="query"                                         //VB explain
                            placeholder="Enter Your Question"
                            style={{marginRight: '5px', width: '100%'}}
                            value={question}                                    //VB explain
                            onChange={(e) => setQuestion(e.target.value)}       //VB explain
                        />
                        <button type="submit" className="btn-submit">Ask</button>

                    </form>

                </div>

                <div className="col-md-8">

                    {answer && (
                        <div className="div-main">
                            {answer}
                        </div>
                    )}
                </div>

            </div>

        </main>


    );


}

export default AskGPTQuestion;