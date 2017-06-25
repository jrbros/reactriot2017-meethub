import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Filters from '../containers/Filters';
import { checkIfCurrentUrlContainsCodeParameter, extractCodeParameterFromCurrentUrl } from '../apis/github';


const Main = styled.main`
    &:before {
        /* Box model */
        content: '';
        top: -30px;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        z-index: 1;

        /* Visual */
        visibility: ${props => props.searchIsActive ? 'visible' : 'hidden'};
        opacity: ${props => props.searchIsActive ? '1' : '0'};
        background-color: rgba(0, 0, 0, .6);
        transition:  all .2s linear;
    }
`;


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
                <Main searchIsActive={this.props.searchIsActive}>
                    {this.props.children}
                </Main>
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
