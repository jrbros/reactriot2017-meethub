import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';
import Filters from '../containers/Filters';

const StyledApp = styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
    min-height: 100%;

    /* Visual */
    background-color: #F5F5F5;
    background-image: ${props => props.pathname === '/' ?
    'linear-gradient(263deg, #00c9ff, #92fe9d)' :
    'none'};
`;


const Main = styled.main`
    flex: 1 0 auto;

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

    componentDidMount() {
        this.props.askForGeoLocation();
    }

    render() {
        return (
            <StyledApp pathname={this.props.pathname}>
                <Header />
                <Filters />
                <Main searchIsActive={this.props.searchIsActive}>
                    {this.props.children}
                </Main>
                <Footer/>
            </StyledApp>
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
