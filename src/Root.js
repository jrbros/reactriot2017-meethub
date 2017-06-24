import React from 'react';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './components/App';
import Meet from './containers/Meet.js';

import store from './store';

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
