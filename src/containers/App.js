import React, { Component } from 'react';
import '../css/App.css';

class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default App;
