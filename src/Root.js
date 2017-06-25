import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter} from 'react-router-redux';

import App from './containers/App';
import Meet from './containers/Meet';
import Home from './containers/Home';
import PageNotFound from './components/PageNotFound';

import store, { history } from './store';
import theme from './theme';

export default () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
                <App>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/meet' component={Meet} />
                        <Route component={PageNotFound} />
                    </Switch>
                </App>
            </ConnectedRouter>
        </ThemeProvider>
    </Provider>
);
