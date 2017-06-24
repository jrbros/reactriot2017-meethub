import fetch from '../lib/fetch';

const SEARCH_API = 'https://api.github.com/search/users';

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

export default {
    searchUsers,
    buildSearchQuery
}
