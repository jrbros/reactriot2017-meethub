import fetch from '../lib/fetch';

const API_TOKEN = '9589199d5bc89df0ed60621b0f43107f8e1be333'
const SEARCH_USERS_API = 'https://api.github.com/search/users';
const USERS_API = 'https://api.github.com/users';

const MAIN_CONFIG = {
    method: 'GET',
    headers: {
        'Authorization': `token ${API_TOKEN}`
    }
};

const ERROR_HANDLER = {
    '400': 'Something is going wrong with the github API. Please try again later...',
    '404': 'Something is going wrong with the github API. Please try again later...',
    '403': 'Ups! It\'s seems you have exceeed github API limitations. Please try again later...',
    '401': 'Ups! It\'s seems your github credentials are wrong...',
    null: 'An unhandled error occured while calling github API...'
};

export function buildSearchQuery(searchParameters, page=1) {
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
          .map(parameter => (
              isArray(parameter) === false ?
               formatParameter(parameter) :
               formatMultiParameter(parameter)
          ))
          .join('+') + `&page=${page}`;
}

export function searchUsers(searchQuery) {
    /**
     * Call the github search api by passing a query.
     * @param {String} searchQuery The query to pass in the url.
     * @returns {Promise} The promise giving the users search results.
     */
    return fetch(
        `${SEARCH_USERS_API}?q=${searchQuery}`,
        MAIN_CONFIG
    );
}

export function getUser(userLogin) {
    /**
     * Call the github users api by passing a user login.
     * @param {String} userLogin The github user login to get.
     * @returns {Promise} The promise giving the users search results.
     */
    return fetch(
        `${USERS_API}/${userLogin}`,
        MAIN_CONFIG
    );
}

export function getUserLanguages(userLogin) {
    /**
     * Call the github users api by passing a user login.
     * @param {String} userLogin The github user login to get.
     * @returns {Promise} The promise giving the users search results.
     */
    return fetch(
        `${USERS_API}/${userLogin}/repos`,
        MAIN_CONFIG
    ).then(repos => [...new Set(repos.filter(({language}) => Boolean(language)).map(({language}) => language))]);
}

export function handleErrorMessage(error) {
    console.error(error);
    if (!error || !error.response || ERROR_HANDLER[error.response.status] === undefined) return ERROR_HANDLER[null];
    return ERROR_HANDLER[error.response.status];
}

export default {
    searchUsers,
    getUser,
    getUserLanguages,
    handleErrorMessage
}
