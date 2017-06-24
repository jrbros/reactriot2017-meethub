import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import users from './ducks/users';
import geoLocation from './ducks/geoLocation';
import languages from './ducks/languages';

const store = createStore(
    combineReducers({
        users,
        languages,
        geoLocation,
        routing: routerReducer
    }),
    applyMiddleware(thunk)
);

export default store;
