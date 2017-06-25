import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import users from './ducks/users';
import geoLocation from './ducks/geoLocation';
import languages from './ducks/languages';
import connectedUser from './ducks/connectedUser';
import app from './ducks/app';

const store = createStore(
    combineReducers({
        app,
        users,
        connectedUser,
        languages,
        geoLocation,
        routing: routerReducer
    }),
    applyMiddleware(thunk)
);

export default store;
