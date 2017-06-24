import githubAPI, { buildSearchQuery } from '../apis/github';
import User from '../types/user';

const WAIT_USERS = 'WAIT_USERS';
const RECEIVE_USERS = 'RECEIVE_USERS';
const RECEIVE_USERS_INCREMENT = 'RECEIVE_USERS_INCREMENT';
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

function receiveUsersIncrement(users) {
    return {
        type: RECEIVE_USERS_INCREMENT,
        payload: {users}
    };
}

function failToReceiveUsers(error) {
    return {
        type: FAIL_TO_SEARCH_USERS,
        payload: {error}
    };
}

export function fetchUsersInformations(users, nextPage = false) {
    return dispatch => {
        return Promise.all(users.map(
            user => {
                return Promise.all([githubAPI.getUser(user.login), githubAPI.getUserLanguages(user.login)])
                    .then(([userInformation, userLanguages]) => User.fromGithubOject({
                            ...userInformation,
                            languages: [...user.languages, ...userLanguages]
                    }))
            }))
            .then((responses) => dispatch(!nextPage ? receiveUsers(responses) : receiveUsersIncrement(responses)))
            .catch(error => dispatch(failToReceiveUsers(githubAPI.handleErrorMessage(error))));
    };
}

export function searchUsers(searchParameters, page=1) {
    return dispatch => {
        dispatch(waitUsers());
        return githubAPI.searchUsers(buildSearchQuery(searchParameters, page))
            .then(response => {
                const users = response.items.map(
                    user => User.fromGithubOject({...user, languages: searchParameters.language})
                );
                if (page <= 1) dispatch(receiveUsers(users));
                return dispatch(fetchUsersInformations(users, page > 1));
            })
            .catch(error => dispatch(failToReceiveUsers(githubAPI.handleErrorMessage(error))));
    };
}

const INITIAL_INDICATORS_STATE = {
    loading: false,
    loadingMessage: null,
    error: null,
    page: 1
};

const INITIAL_STATE = {
    ...INITIAL_INDICATORS_STATE,
    usersInformations: [],
    page: 1,
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
        case 'RECEIVE_USERS_INCREMENT':
            return {
                ...state,
                ...INITIAL_INDICATORS_STATE,
                page: state.page + 1,
                usersInformations: [...state.usersInformations, ...action.payload.users],
                empty: false,
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
