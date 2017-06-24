import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from './containers/App.js';
// import MyContainer from './containers/container';
// import mycontainerReducer from './containers/mycontainer/reducer';

const store = createStore(
    combineReducers({
        routing: routerReducer
    })
);

const history = syncHistoryWithStore(browserHistory, store);

export default () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                {/*<Route path="mycontainer" component={MyContainer}/>*/}
            </Route>
        </Router>
    </Provider>
);
