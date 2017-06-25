import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from './Header';
import Filters from '../containers/Filters';
import githubAPI, {
    checkIfCurrentUrlContainsCodeParameter, extractCodeParameterFromCurrentUrl
} from '../apis/github';

class App extends Component {

    componentWillMount() {
        this.props.askForGeoLocation();
        if (checkIfCurrentUrlContainsCodeParameter(window)) {
            githubAPI.getConnectedUserToken(extractCodeParameterFromCurrentUrl(window))
                .then(e => console.log(e))
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
