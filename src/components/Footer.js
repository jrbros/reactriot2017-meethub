import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div `
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    position: relative;
    z-index: 3;
`;

const Copy = styled.p `
    font-size: 1rem;
    text-align: center;
    font-weight: 400;

    > span {
        color: red;
    }
`;

class Footer extends Component {
    render() {
        return (
            <Wrapper>
                <Copy>
                    Made with <span>&#10084;</span> in Bordeaux
                </Copy>
            </Wrapper>
        );
    }
}

Footer.defaultProps = {
};

Footer.propTypes = {
};

export default Footer;
