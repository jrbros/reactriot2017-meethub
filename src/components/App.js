import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from './Header';
import Filters from '../containers/Filters';
import { checkIfCurrentUrlContainsCodeParameter, extractCodeParameterFromCurrentUrl } from '../apis/github';

class App extends Component {

    componentWillMount() {
        this.props.askForGeoLocation();
        if (checkIfCurrentUrlContainsCodeParameter(window)) {
            this.props.getConnectedUserToken(extractCodeParameterFromCurrentUrl(window));
        }
    }

    render() {
        return (
            <div>
                <Header />
                <Filters />
                {this.props.children}
            </div>
        );
    }
}

App.defaultProps = {
    askForGeoLocation: () => null,
};

App.propTypes = {
    askForGeoLocation: PropTypes.func,
};

export default App;
