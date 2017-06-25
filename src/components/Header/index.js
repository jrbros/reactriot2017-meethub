import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Meethub from './meethub@2x.png';

const StyledHeader = styled.header`
    /* Box model */
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 170px;
    position: relative;
    z-index: 3;

    /* Visual */
    background-image: ${props => props.pathname === '/' ?
    'none' :
    'linear-gradient(263deg, #00c9ff, #92fe9d)'};
`;

const Logo = styled.h1`
    /* Box model */
    margin: 0;
    padding-top: 1.3rem;

    /* Typo */
    line-height: 0;
`;

const Baseline = styled.h2`
    /* Box model */
    margin: 0;

    /* Typo */
    color: #fff;
    font-weight: 400;
    font-size: 1rem;
`;

const Widget = styled.a`
    /* Box model */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .4rem .9rem;
    width: 100%;

    /* Typo */
    color: #fff;
    text-decoration: none;
    text-align: center;

    /* Visual */
    background-color: rgba(0, 0, 0, .5);

    > img {
        margin: 0 .5rem;
    }
`;

const Header = ({ pathname }) => (
  <StyledHeader pathname={pathname}>
      <Widget href="https://www.reactriot.com/entries/337-reacttakeiteasy/vote">
        Our entry for <img height="30" src="https://rumblex-reactriot1.s3.amazonaws.com/images/widget-logo.png" alt="Widget logo" />
        Vote for us
      </Widget>
      <Logo>
          <Link to='/'><img src={Meethub} alt='Meethub' width='192' height='41' /></Link>
      </Logo>
      <Baseline>Push some filters, meet future tech friends</Baseline>
  </StyledHeader>
);

export default Header;
