import githubAPI, { buildSearchQuery } from '../apis/github';
import User from '../types/user';

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
                return Promise.all([githubAPI.getUser(user.login), githubAPI.getUserLanguages(user.login)])
                    .then(([userInformation, userLanguages]) => User.fromGithubOject({
                            ...userInformation,
                            languages: [...user.languages, ...userLanguages]
                    }))
            }))
            .then((responses) => dispatch(receiveUsers(responses)))
            .catch(error => dispatch(failToReceiveUsers(githubAPI.handleErrorMessage(error))));
    };
}

export function searchUsers(searchParameters) {
    return dispatch => {
        dispatch(waitUsers());
        return githubAPI.searchUsers(buildSearchQuery(searchParameters))
            .then(response => {
                const users = response.items.map(
                    user => User.fromGithubOject({...user, languages: searchParameters.language})
                );
                dispatch(receiveUsers(users));
                return dispatch(fetchUsersInformations(users));
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
