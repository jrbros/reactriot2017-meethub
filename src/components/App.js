import React, { Component } from 'react';
import Header from './Header';
import Filters from './Filters';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Filters />
                {this.props.children}
            </div>
        )
    }
}

export default App;
