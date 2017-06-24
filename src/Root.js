import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App';
import Meet from './containers/Meet';

import store from './store';
import theme from './theme';

const history = syncHistoryWithStore(browserHistory, store);

export default () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App>
                <Router history={history}>
                    <Route path='/' component={Meet}/>
                </Router>
            </App>
         </ThemeProvider>
    </Provider>
);
