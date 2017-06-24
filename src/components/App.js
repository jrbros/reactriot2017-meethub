import React, { Component } from 'react';
import Header from './Header';
import Filters from '../containers/Filters';

class App extends Component {

    componentDidMount() {
        this.props.askForGeoLocation();
    }

    render() {
        const { empty, location } = this.props;
        return (
            <div>
                <Header />
                <Filters />
                {
                    empty ? 'You refused geoloc' : location
                }
                {this.props.children}
            </div>
        )
    }
}

export default App;
