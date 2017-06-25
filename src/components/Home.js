import React, { Component } from 'react';
import styled from 'styled-components';

import { USER_CONNECTION_URL } from '../apis/github';

const Wrapper = styled.div `
    height: 100%;
    width: 100%;
    padding-top: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h2 `
    color: #ffffff;
    font-size: 1.875rem;
    text-align: center;
    font-weight: 300;
`;

const Button = styled.a `
    /* Box model */
    padding: 1rem 2rem;

    /* Typo */
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    color: #ffffff;
    text-transform: uppercase;

    /* Visual */
    background-color: #000000;
    border-radius: 3px;
    border: 0;
`;

class Home extends Component {
    render() {
        return (
            <Wrapper>
                <Title>
                    Search some techs directly or connect with your GitHub account<br/>
                to get personnal matching and extra features !
                </Title>
                <Button href={USER_CONNECTION_URL}>Connect with GitHub</Button>
            </Wrapper>
        );
    }
}

Home.defaultProps = {
};

Home.propTypes = {
};

export default Home;
