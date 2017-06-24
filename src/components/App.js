import React, { Component } from 'react';
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

export default App;
