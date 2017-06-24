import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import filterReducer from './ducks/users';

const store = createStore(
    combineReducers({
        filter: filterReducer,
        routing: routerReducer
    })
);

export default store;
