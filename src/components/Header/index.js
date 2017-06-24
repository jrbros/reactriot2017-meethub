import React from 'react';
import styled from 'styled-components';

import Meethub from './meethub@2x.png';

const StyledHeader = styled.header`
    /* Box model */
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 125px;
    padding-top: 1.188rem;

    /* Visual */
    background-image: linear-gradient(263deg, #00c9ff, #92fe9d);
`;

const Logo = styled.h1`
    /* Box model */
    margin: 0;

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

const Header = () => (
  <StyledHeader>
      <Logo>
          <img src={Meethub} alt='Meethub' width='192' height='41' />
      </Logo>
      <Baseline>Push some filters, meet future friends</Baseline>
  </StyledHeader>
);

export default Header;
