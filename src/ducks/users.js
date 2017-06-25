import githubAPI, { buildSearchQuery } from '../apis/github';
import User from '../types/user';

const WAIT_USERS = 'WAIT_USERS';
const WAIT_USERS_INCREMENT = 'WAIT_USERS_INCREMENT';
const RECEIVE_USERS = 'RECEIVE_USERS';
const RECEIVE_USERS_INCREMENT = 'RECEIVE_USERS_INCREMENT';
const FAIL_TO_SEARCH_USERS = 'FAIL_TO_SEARCH_USERS';


function waitUsers(searchParameters) {
    return {
        type: WAIT_USERS,
        payload: {searchParameters}
    };
}

function waitUsersIncrement() {
    return {
        type: WAIT_USERS_INCREMENT,
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

export function fetchUsersInformations(users, isFirstPage = true) {
    return dispatch => {
        return Promise.all(users.map(
            user => {
                return githubAPI.getCompleteUserInformations(user.login)
                    .then(response => {
                        const userInformations = User.fromGithubOject(response);
                        return User.fromGithubOject({
                            ...userInformations,
                            languages: [...user.languages, ...userInformations.languages]
                        });
                    });
            }))
            .then((responses) => dispatch(isFirstPage ? receiveUsers(responses) : receiveUsersIncrement(responses)))
            .catch(error => dispatch(failToReceiveUsers(githubAPI.handleErrorMessage(error))));
    };
}

export function searchUsers(searchParameters, page=1) {
    return dispatch => {
        const isFirstPage = page <= 1;
        dispatch(isFirstPage ? waitUsers(searchParameters) : waitUsersIncrement());
        return githubAPI.searchUsers(buildSearchQuery(searchParameters, page))
            .then(response => {
                const users = response.items.map(
                    user => User.fromGithubOject({...user, languages: searchParameters.language})
                );
                if (isFirstPage) dispatch(receiveUsers(users));
                return dispatch(fetchUsersInformations(users, isFirstPage));
            })
            .catch(error => dispatch(failToReceiveUsers(githubAPI.handleErrorMessage(error))));
    };
}

const INITIAL_INDICATORS_STATE = {
    loading: false,
    loadingIncrement: false,
    error: null,
    page: 1,
};

const INITIAL_STATE = {
    ...INITIAL_INDICATORS_STATE,
    usersInformations: [],
    searchParameters: {},
    empty: true,
};


const store = (state = INITIAL_STATE, action = null) => {
    switch (action.type) {
        case 'WAIT_USERS':
            return {
                ...state,
                error: INITIAL_STATE.error,
                searchParameters: action.payload.searchParameters,
                loading: true,
            };
        case 'WAIT_USERS_INCREMENT':
            return {
                ...state,
                error: INITIAL_STATE.error,
                loadingIncrement: true,
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
