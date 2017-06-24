import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'normalize.css/normalize.css';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import './global-styles';

import loaderConnector from './connectors/loader';
import App from './containers/App';
import Meet from './containers/Meet';
import Loader from './components/Loader';

import store from './store';
import theme from './theme';

const LoadingMeetContainer = loaderConnector(Loader(Meet));

const history = syncHistoryWithStore(browserHistory, store);

export default () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App>
                <Router history={history}>
                    <Route path='/' component={LoadingMeetContainer}/>
                </Router>
            </App>
         </ThemeProvider>
    </Provider>
);
