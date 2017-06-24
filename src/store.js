import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import users from './ducks/users';
import geoLocation from './ducks/location';

const store = createStore(
    combineReducers({
        users,
        geoLocation,
        routing: routerReducer
    }),
    applyMiddleware(thunk)
);

export default store;
