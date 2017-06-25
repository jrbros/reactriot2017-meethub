import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    position: relative;
    z-index: 3;
    padding: 0 1rem;
`;

const Copy = styled.p `
    font-size: 1rem;
    text-align: center;
    font-weight: 400;

    > span {
        color: red;
    }
`;

const BackToTop = styled.a`
    position: absolute;
    right: 1rem;
    top: 17px;
    cursor: pointer;
`;

class Footer extends Component {
    render() {
        return (
            <Wrapper>
                <Copy>
                    Made with <span>&#10084;</span> in Bordeaux
                </Copy>
                <BackToTop onClick={() => window.scrollTo(0, 0)}>Back to top</BackToTop>
            </Wrapper>
        );
    }
}

Footer.defaultProps = {
};

Footer.propTypes = {
};

export default Footer;
