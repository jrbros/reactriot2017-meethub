import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from './Header';
import Filters from '../containers/Filters';

class App extends Component {

    componentDidMount() {
        this.props.askForGeoLocation();
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
