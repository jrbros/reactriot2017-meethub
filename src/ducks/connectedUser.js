import githubAPI, { updateAPIToken, parseConnectedUserToken } from '../apis/github';
import { updateLanguages } from './languages';
import User from '../types/user';

const RECEIVE_CONNECTED_USER_TOKEN = 'RECEIVE_CONNECTED_USER_TOKEN';
const RECEIVE_CONNECTED_USER = 'RECEIVE_CONNECTED_USER';
const FAIL_TO_RECEIVE_CONNECTED_USER = 'FAIL_TO_RECEIVE_CONNECTED_USER';


function receiveConnectedUserToken(token) {
    if (token) updateAPIToken(token);
    return {
        type: RECEIVE_CONNECTED_USER_TOKEN,
        payload: {token}
    };
}

function receiveConnectedUser(user) {
    return {
        type: RECEIVE_CONNECTED_USER,
        payload: {user}
    };
}

function failToReceiveConnectedUser(error) {
    return {
        type: FAIL_TO_RECEIVE_CONNECTED_USER,
        payload: {error}
    };
}

function getConnectedUser() {
    return dispatch => {
        return githubAPI.getCompleteUserInformations()
            .then(response => {
                const userInformations = User.fromGithubOject(response);
                dispatch(updateLanguages(userInformations.languages))
                return dispatch(receiveConnectedUser(userInformations))
            })
            .catch(error => dispatch(failToReceiveConnectedUser(githubAPI.handleErrorMessage(error))));
    };
}

function getConnectedUserToken(githubCode) {
    return dispatch => {
        return githubAPI.getConnectedUserToken(githubCode)
            .then(response => {
                dispatch(receiveConnectedUserToken(parseConnectedUserToken(response)));
                return dispatch(getConnectedUser());
            })
            .catch(error => dispatch(failToReceiveConnectedUser(githubAPI.handleErrorMessage(error))));
    };
}


const INITIAL_INDICATORS_STATE = {
    error: null,
    loading: false
};

const INITIAL_STATE = {
    ...INITIAL_INDICATORS_STATE,
    userInformation: {},
    searchParameters: {},
    token: null,
    empty: true,
};


const store = (state = INITIAL_STATE, action = null) => {
    switch (action.type) {
        case 'RECEIVE_CONNECTED_USER_TOKEN':
            return {
                ...state,
                ...INITIAL_INDICATORS_STATE,
                token: action.payload.token,
            };
        case 'RECEIVE_CONNECTED_USER':
            console.log(action.payload.user);
            return {
                ...state,
                ...INITIAL_INDICATORS_STATE,
                userInformation: action.payload.user,
                empty: false
            };
        case 'FAIL_TO_RECEIVE_CONNECTED_USER':
            return {
                ...state,
                ...INITIAL_INDICATORS_STATE,
                error: action.payload.error
            };
        default:
            return state;
    }
}

export {
    getConnectedUserToken
};
export default store;
