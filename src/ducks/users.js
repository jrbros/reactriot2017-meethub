import githubAPI, { buildSearchQuery } from '../apis/github';

const WAIT_USERS = 'WAIT_USERS';
const RECEIVE_USERS = 'RECEIVE_USERS';
const FAIL_TO_SEARCH_USERS = 'FAIL_TO_SEARCH_USERS';


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

export function fetchUsersInformations(users) {
    return dispatch => {
        dispatch(waitUsers());
        return Promise.all(users.map(
            user => {
                console.log("yo");
                return Promise.all([githubAPI.getUser(user.login), githubAPI.getUserLanguages(user.login)])
                .then(([user, userLanguages]) => ({...user, languages: userLanguages}))
            }
        ))
            .then((responses) => dispatch(receiveUsers(responses)))
            .catch(error => dispatch(githubAPI.handleErrorMessage(error)));
    };
}

export function searchUsers(searchParameters) {
    return dispatch => {
        dispatch(waitUsers());
        return githubAPI.searchUsers(buildSearchQuery(searchParameters))
            .then(response => {
                dispatch(receiveUsers(response.items))
                return dispatch(fetchUsersInformations(response.items));
            })
            .catch(error => dispatch(failToReceiveUsers(githubAPI.handleErrorMessage(error))));
    };
}

const INITIAL_INDICATORS_STATE = {
    loading: false,
    loadingMessage: null,
    error: null
};

const INITIAL_STATE = {
    ...INITIAL_INDICATORS_STATE,
    usersInformations: [],
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
            return {
                ...state,
                ...INITIAL_INDICATORS_STATE,
                usersInformations: action.payload.users,
                empty: action.payload.users.length <= 0,
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
