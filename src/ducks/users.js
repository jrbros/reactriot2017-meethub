import githubAPI from '../api/github';

const WAIT_USERS = 'WAIT_USERS';
const RECEIVE_USERS = 'RECEIVE_USERS';
const FAIL_TO_SEARCH_USERS = 'FAIL_TO_SEARCH_USERS';
const WAIT_USER_INFORMATIONS = 'WAIT_USER_INFORMATIONS';
const RECEIVE_USER_INFORMATIONS = 'RECEIVE_USER_INFORMATIONS';
const FAIL_TO_FETCH_USER_INFORMATIONS = 'FAIL_TO_FETCH_USER_INFORMATIONS';

function waitUsers() {
    return {
        type: WAIT_USERS
    };
}

function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        payload: {users}
    };
}

function failToReceiveUsers(error) {
    return {
        type: FAIL_TO_SEARCH_USERS,
        payload: {error}
    };
}

export function searchUsers(searchParameters) {
    return dispatch => {
        dispatch(waitUsers());
        return githubAPI.searchUsers(githubAPI.buildSearchQuery(searchParameters))
            .then(users => dispatch(receiveUsers(users)))
            .catch(error => dispatch(failToReceiveUsers(error)));
    };
}

function waitUserInformations() {
    return {
        type: WAIT_USER_INFORMATIONS
    };
}

function receiveUserInformations(user) {
    return {
        type: RECEIVE_USER_INFORMATIONS,
        payload: {user}
    };
}

function failToReceiveUserInformations(error) {
    return {
        type: FAIL_TO_FETCH_USER_INFORMATIONS,
        payload: {error}
    };
}

export function fetchUserInformations(userLogin) {
    return dispatch => {
        dispatch(waitUserInformations());
        return githubAPI.getUser(userLogin)
            .then(user => dispatch(receiveUserInformations(user)))
            .catch(error => dispatch(failToReceiveUserInformations(error)));
    };
}


const INITIAL_INDICATORS_STATE = {
    loading: false,
    loadingMessage: null,
    error: null
};

const INITIAL_STATE = {
    ...INITIAL_INDICATORS_STATE,
    users: [],
    empty: true,
};


const store = (state = INITIAL_STATE, action = null) => {
    switch (action.type) {
        case 'WAIT_USERS':
            return {
                ...state,
                error: INITIAL_STATE.error,
                loading: true,
                loadingMessage: 'Loading users data...'
            };
        case 'RECEIVE_USERS':
            const users = [...state.users, ...action.payload.users];
            return {
                ...state,
                ...INITIAL_INDICATORS_STATE,
                users,
                empty: users.length <= 0,
            };
        case 'FAIL_TO_SEARCH_USERS':
            return {
                ...state,
                ...INITIAL_INDICATORS_STATE,
                error: action.payload.error
            };
        default:
            return state;
    }
}

export default store;
