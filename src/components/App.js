import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';
import Filters from '../containers/Filters';
import { checkIfCurrentUrlContainsCodeParameter, extractCodeParameterFromCurrentUrl } from '../apis/github';

import Background from './background.jpg';

const StyledApp = styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
    min-height: 100%;
    position: relative;
    z-index: 2;

    /* Visual */
    background-color: #F5F5F5;

    &:after {
        /* Box model */
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;

        /* Visual */
        background-image: ${props => props.pathname === '/' ?
        `url(${Background})` :
        'none'};
        background-size: cover;
    }

    &:before {
        /* Box model */
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 2;

        /* Visual */
        background-image: ${props => props.pathname === '/' ?
        `linear-gradient(263deg, #00c9ff, #92fe9d)` :
        'none'};
        opacity: .9;
    }
`;


const Main = styled.main`
    flex: 1 0 auto;
    position: relative;
    z-index: 4;

    &:before {
        /* Box model */
        content: '';
        top: -30px;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        z-index: 5;

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
        const { pathname, searchIsActive, children } = this.props;
        return (
            <StyledApp pathname={pathname}>
                <Header pathname={pathname} />
                <Filters />
                <Main searchIsActive={searchIsActive}>
                    {children}
                </Main>
                <Footer/>
            </StyledApp>
        );
    }
}

App.defaultProps = {
    askForGeoLocation: () => null,
    searchIsActive: false,
    pathname: ''
};

App.propTypes = {
    askForGeoLocation: PropTypes.func,
    searchIsActive: PropTypes.bool,
    pathname: PropTypes.string
};

export default App;
