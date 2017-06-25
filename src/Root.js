import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Switch, Route, HashRouter } from 'react-router-dom';

import App from './containers/App';
import Meet from './containers/Meet';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';

import store, { history } from './store';
import theme from './theme';

export default () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <HashRouter history={history}>
                <App>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/meet' component={Meet} />
                        <Route component={PageNotFound} />
                    </Switch>
                </App>
            </HashRouter>
        </ThemeProvider>
    </Provider>
);
