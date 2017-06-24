import fetch from '../lib/fetch';

const SEARCH_API = 'https://api.github.com/search/user';

const ERROR_HANDLER = {
    '400': 'Something is going wrong with the github API. Please try again later...',
    '404': 'Something is going wrong with the github API. Please try again later...',
    '403': 'Ups! It\'s seems you can\'t query github API...',
    '401': 'Ups! It\'s seems your github credentials are wrong...',
    null: 'An unhandled error occured while calling github API...'
}

function buildSearchQuery(searchParameters) {
    /**
    * Build a github search query from a parameter object.
    * @param {Object} searchParameters The parameter object used to search.
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
          .join('+');
}

function searchUsers(searchQuery) {
    /**
     * Call the github search api by passing a query.
     * @param {String} searchQuery The query to pass in the url.
     * @returns {Promise} The promise giving the users search results.
     */
    return fetch(
        `${SEARCH_API}?q=${searchQuery}`,
        {
            method: 'GET'
        }
    );
}

function handleErrorMessage(error) {
    if (!error || !error.response || ERROR_HANDLER[error.response.status] === undefined) return ERROR_HANDLER[null];
    return ERROR_HANDLER[error.response.status];
}

export default {
    searchUsers,
    buildSearchQuery,
    handleErrorMessage
}
