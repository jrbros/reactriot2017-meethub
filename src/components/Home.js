import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

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

const Button = styled.button `
    padding: 1rem 2rem;
    color: #ffffff;
    text-transform: uppercase;
    background-color: #000000;
    border-radius: 3px;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
`;

class Home extends Component {
    render() {
        return (
            <Wrapper>
                <Title>
                    Search directly or connect with your GitHub account,<br/>
                    and get personnalize results linked to your profil
                </Title>
                <Button>Connect with GitHub</Button>
            </Wrapper>
        );
    }
}

Home.defaultProps = {
};

Home.propTypes = {
};

export default Home;
