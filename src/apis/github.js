import fetch from '../lib/fetch';

const API_TOKEN = '9589199d5bc89df0ed60621b0f43107f8e1be333';
const CLIENT_ID = '6651283c4549f4d595d4';
const CLIENT_SECRET = 'd81ef3645599a8b0807bb3cf1912dc963a4eb20c';
const USER_CONNECTION_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;
const CONNECTED_USER_TOKEN_API = `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token`;
const CONNECTED_USER_API = `https://api.github.com/user`;
const SEARCH_USERS_API = 'https://api.github.com/search/users';
const USERS_API = 'https://api.github.com/users';

const GET_CONFIG = {
    method: 'GET',
    headers: {
        'Authorization': `token ${API_TOKEN}`
    }
};

const POST_CONFIG = {
    method: 'POST',
    mode: 'cors'
};

const ERROR_HANDLER = {
    '400': 'Something is going wrong with the github API. Please try again later...',
    '404': 'Something is going wrong with the github API. Please try again later...',
    '403': 'Ups! It\'s seems you have exceeed github API limitations. Please try again later...',
    '401': 'Ups! It\'s seems your github credentials are wrong...',
    null: 'An unhandled error occured while calling github API...'
};

const CODE_PARAMETER_REGEXP = /\?code=(.*?)#/;
const CONNECTED_USER_TOKEN_REGEXP = /access_token=(.*?)&scope/;

function updateAPIToken(token) {
    /**
     * Update the api token used by an other. Crapy function.
     * @param {String} token The new token to suscribe.
     */
     GET_CONFIG.headers.Authorization = `token ${token}`;
}

function checkIfCurrentUrlContainsCodeParameter(window) {
    /**
     * Check if an url have ?code= coming from github redirection.
     * @param {Object} window The current window object.
     * @returns {Boolean} True if the parameter is present else False.
     */
     try {
         return CODE_PARAMETER_REGEXP.test(window.location.href);
     } catch (e) {
         return false;
     }
}

function extractCodeParameterFromCurrentUrl(window) {
    /**
     * Extract ?code= from the current url coming from github redirection.
     * @param {Object} window The current window object.
     * @returns {String} The code parameter.
     */
    try {
     return CODE_PARAMETER_REGEXP.exec(window.location.href)[1];
    } catch (e) {
     return '';
    }
}

function parseConnectedUserToken(token) {
    /**
     * Parse the github return containing connected user token.
     * @param {String} token The non-parsed token.
     * @returns {String} The token.
     */
    try {
        return CONNECTED_USER_TOKEN_REGEXP.exec(token)[1];
    } catch (e) {
        return null;
    }
}

function buildSearchQuery(searchParameters, page=1) {
    /**
    * Build a github search query from a parameter object.
    * @param {Object} searchParameters The parameter object used to search.
    * @param {Integer} page The page used to realize the query.
    * @returns {String} The search query ready to use in the http call.
    */
    const isArray = parameter => Array.isArray(searchParameters[parameter]);
    const formatParameter = parameter => `${parameter}:${searchParameters[parameter]}`;
    const formatMultiParameter = parameter => (
        searchParameters[parameter].map(value => `${parameter}:${value}`).join('+')
    );
    return Object.keys(searchParameters)
          .map(parameter => encodeURIComponent(
              isArray(parameter) === false ?
               formatParameter(parameter) :
               formatMultiParameter(parameter)
          ))
          .join('+') + `&page=${page}`;
}


function getConnectedUserToken(githubCode) {
    /**
     * Use the given githubCode to obtain the user token.
     * @param {String} githubCode The githubCode coming from github.
     * @returns {Promise} The promise giving the user token results.
     */
    return fetch(
        `${CONNECTED_USER_TOKEN_API}?utf8=✓&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${githubCode}`,
        POST_CONFIG,
        false
    );
}

function searchUsers(searchQuery) {
    /**
     * Call the github search api by passing a query.
     * @param {String} searchQuery The query to pass in the url.
     * @returns {Promise} The promise giving the users search results.
     */
    return fetch(
        `${SEARCH_USERS_API}?utf8=✓&q=${searchQuery}`,
        GET_CONFIG
    );
}

function getUser(userLogin) {
    /**
     * Call the github users api by passing a user login.
     * @param {String} userLogin The github user login to get.
     * @returns {Promise} The promise giving the users search results.
     */
    return fetch(
        userLogin ? `${USERS_API}/${userLogin}` : `${CONNECTED_USER_API}`,
        GET_CONFIG
    );
}

function getUserLanguages(userLogin) {
    /**
     * Call the github users api by passing a user login.
     * @param {String} userLogin The github user login to get.
     * @returns {Promise} The promise giving the users search results.
     */
    return fetch(
        userLogin ? `${USERS_API}/${userLogin}/repos` : `${CONNECTED_USER_API}/repos`,
        GET_CONFIG
    ).then(repos => [...new Set(repos.filter(({language}) => Boolean(language)).map(({language}) => language))]);
}

function getCompleteUserInformations(userLogin) {
    /**
     * Call both the github user api and user/repo api by passing a user login.
     * @param {String} userLogin The github user login to get.
     * @returns {Promise} The promise giving the user complete result.
     */

    return Promise.all([getUser(userLogin), getUserLanguages(userLogin)])
        .then(([userInformation, userLanguages]) => ({
                ...userInformation,
                languages: userLanguages
        }));
}

function handleErrorMessage(error) {
    console.error(error);
    if (!error || !error.response || ERROR_HANDLER[error.response.status] === undefined) return ERROR_HANDLER[null];
    return ERROR_HANDLER[error.response.status];
}

export {
    USER_CONNECTION_URL,
    GET_CONFIG,
    checkIfCurrentUrlContainsCodeParameter,
    extractCodeParameterFromCurrentUrl,
    buildSearchQuery,
    parseConnectedUserToken,
    updateAPIToken
};
export default {
    searchUsers,
    getConnectedUserToken,
    getUser,
    getUserLanguages,
    getCompleteUserInformations,
    handleErrorMessage
}
