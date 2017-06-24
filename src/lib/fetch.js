import fetch from 'isomorphic-fetch';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    }
    const error = Error(response.statusText);
    error.response = response;
    throw error;
}

export default function fetchAPI(url, options) {
    return fetch(url, options).then(checkStatus);
}
