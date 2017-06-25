import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { browserHistory } from 'react-router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App';
import Meet from './containers/Meet';

import store from './store';
import theme from './theme';

const history = syncHistoryWithStore(browserHistory, store);

export default () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter history={history}>
                <App>
                    <Switch>
                        <Route exact path='/' component={Meet} />
                        <Route render={() => <div>Not found</div>} />
                    </Switch>
                </App>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
);
