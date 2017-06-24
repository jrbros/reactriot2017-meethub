import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from './containers/App';
import Meet from './containers/Meet';
import users from './containers/Filter/ducks/users';

const store = createStore(
    combineReducers({
        users: users,
        routing: routerReducer
    }),
    applyMiddleware(thunk)
);

const history = syncHistoryWithStore(browserHistory, store);

export default () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Meet}/>
            </Route>
        </Router>
    </Provider>
);
