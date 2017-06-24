import fetch from '../lib/fetch';

const SEARCH_API = 'https://api.github.com/search/users';

function searchUsers(searchQuery) {
    return fetch(`${SEARCH_API}?${searchQuery}`);
}

export default {
    searchUsers,
}
