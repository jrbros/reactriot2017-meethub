import fetch from 'isomorphic-fetch';

function checkStatus(response) {
    /**
     * Check a fetch response to see if an http error must be raised. If not, return the response.
     * @param {Object} response The fetch response object containing status and the response value.
     * @returns {Object} The response value converted from JSON.
     */
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = Error(response.statusText);
    error.response = response;
    throw error;
}

export default function fetchAPI(url, options, toJSON=true) {
    /**
     * A fetch abstaction checking http status before returning the response.
     * @param {String} url The url of the api to contact.
     * @param {Object} options The options (header, body, mode, ...) to use.
     * @returns {Promise} The response in a promise.
     */
    return fetch(url, options).then(checkStatus).then(response => toJSON ? response.json() : response.text());
}
