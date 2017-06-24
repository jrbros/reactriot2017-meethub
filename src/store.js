import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import users from './ducks/users';

const store = createStore(
    combineReducers({
        users,
        routing: routerReducer
    }),
    applyMiddleware(thunk)
);

export default store;
