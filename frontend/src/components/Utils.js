// utils/forms.js

// Die Datei Utils.js ist ein JavaScript modul. In JavaScript wird jede Datei die Funktionen, Klassen oder Variablen exportiert
// als Modul betrachtet. In diesem Fall exportiert die Datei zwei funktionen.


/**
 * Adds a CSRF token as a hidden input to the specified form.
 * Fetches the token from the server and appends it if not already present.
 *
 * @param {string} elementId - The ID of the form element to which the token should be added.
 */

// Use .getElementById as selector
export function addCsrfTokenToForm1(elementId) {
    fetch('/api/csrf')
        .then(response => response.json())
        .then(data => {
            const form = document.getElementById(elementId);
            if (form && data.token && data.parameterName) {
                // Avoid adding the token more than once
                if (!form.querySelector(`input[name="${data.parameterName}"]`)) {
                    const csrfInput = document.createElement("input");
                    csrfInput.type = "hidden";
                    csrfInput.name = data.parameterName;
                    csrfInput.value = data.token;
                    form.appendChild(csrfInput);
                }
            }
        })
        .catch(error => console.error("Could not fetch CSRF token:", error));
}

// Use .querySelector as selector
export function addCsrfTokenToForm2(actionInput) {
    fetch('/api/csrf')
        .then(response => response.json())
        .then(data => {
            const form = document.querySelector(`form[action="${actionInput}"]`)

            if (form && data.token && data.parameterName) {
                // Avoid adding the token more than once
                if (!form.querySelector(`input[name="${data.parameterName}"]`)) {
                    const csrfInput = document.createElement("input");
                    csrfInput.type = "hidden";
                    csrfInput.name = data.parameterName;
                    csrfInput.value = data.token;
                    form.appendChild(csrfInput);
                }
            }
        })
        .catch(error => console.error("Could not fetch CSRF token:", error));
}


export function sentFormWithCSRFToURL(URL) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = URL;

    // Add CSRF token if available
    fetch('/api/csrf')
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                const csrfInput = document.createElement('input');
                csrfInput.type = 'hidden';
                csrfInput.name = data.parameterName;
                csrfInput.value = data.token;
                form.appendChild(csrfInput);

                document.body.appendChild(form);
                form.submit();
            }
        })
        .catch(error => {
            console.error('Could not fetch CSRF token for logout:', error);
        });
}