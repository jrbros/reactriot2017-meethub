import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import users from './ducks/users';
import location from './ducks/location';

const store = createStore(
    combineReducers({
        users,
        location,
        routing: routerReducer
    }),
    applyMiddleware(thunk)
);

export default store;
