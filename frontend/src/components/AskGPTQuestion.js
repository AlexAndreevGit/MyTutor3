import React, {useEffect, useState} from "react";
import {addCsrfTokenToForm1} from "./Utils";


function AskGPTQuestion(){

    const [question, setQuestion] = useState('')
    const [answer,setAnswer] = useState('')
    
    useEffect(() => {
        addCsrfTokenToForm1("askQuestionForm")
    }, []);


    //event.target - which html element started the event
    function handleResponse(event) {
        event.preventDefault()  //prevent the default behavior which is page reloading or form submit

        const formData = new FormData(event.target)         //FormData is a JS object consisting of Key-Value pairs. In this case it takes the name and the value from the form that is the event.target
        const queryObject = {query: formData.get("query")} //create an JS object {} with a key-value pair {query: formData.get("query1")}    the key is "query"
        const requestBody = JSON.stringify(queryObject)     //covert a JS object in to a JSON string {"query":"What is teh capital of Germany"}. This can be send as an body of an HTTP Post request

        console.log("FormData" , formData)
        console.log("formData.get('_csrf')" , formData.get('_csrf'))

        console.log("requestBody" , requestBody)

        fetch('/tutorials/ask-question',{
            method:'POST',
            body:requestBody,
            headers:{
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': formData.get('_csrf')
            }
        }).then(response => response.json())
            .then(data => setAnswer(data.answer))
    }

    useEffect(() => {
        console.log(answer)
    }, [answer]);

    return(

        <main className="container py-4">
            <div className="div-main-transparen">
                <h1 className="main-title" style={{textAlign: 'center'}}>Ask TutorBot</h1>
                <p className="general-subtitle" style={{textAlign: 'center'}}>Ask the TutorBot any question!</p>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8" style={{display: 'flex', justifyContent: 'center'}}>
                    <form id="askQuestionForm" className="form-group-ask-question" onSubmit={handleResponse}>
                        <input
                            type="text"
                            className="form-control"
                            name="query"
                            placeholder="Enter Your Question"
                            style={{marginRight:'5px', width:'100%'}}
                            value={question}
                            onChange={(e)=>setQuestion(e.target.value)}
                            required
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

    )

}

export default AskGPTQuestion