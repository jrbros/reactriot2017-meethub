import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHashHistory from 'history/createHashHistory';
import thunk from 'redux-thunk';

import users from './ducks/users';
import geoLocation from './ducks/geoLocation';
import languages from './ducks/languages';
import connectedUser from './ducks/connectedUser';
import app from './ducks/app';

const history = createHashHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        app,
        users,
        connectedUser,
        languages,
        geoLocation,
        routing: routerReducer
    }),
    applyMiddleware(thunk, middleware)
);

export { history };

export default store;
