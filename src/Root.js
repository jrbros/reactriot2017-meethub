import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { hashHistory } from 'react-router';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App';
import Meet from './containers/Meet';

import store from './store';
import theme from './theme';

const history = syncHistoryWithStore(hashHistory, store);

export default () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <HashRouter history={history}>
                <App>
                    <Switch>
                        <Route exact path='/' component={Meet} />
                        <Route render={() => <div>Not found</div>} />
                    </Switch>
                </App>
            </HashRouter>
        </ThemeProvider>
    </Provider>
);
