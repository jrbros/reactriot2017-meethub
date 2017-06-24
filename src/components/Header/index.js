import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
    /* Box model */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Header = () => (
  <StyledHeader>
      <h1>meethub</h1>
  </StyledHeader>
);

export default Header;
