import React from 'react';
import styled from 'styled-components';

import ErrorImg from './error@2x.png';

const StyledError = styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h3`
    /* Box model */
    margin: .8rem 0 0;

    /* Typography */
    font-size: 2.25rem;
    font-weight: 300;
    line-height: 1;

    /* Visual */
    color: ${props => props.theme.gray};
`;

const Subtitle = styled.h4`
    /* Box model */
    margin: 0;

    /* Typography */
    font-size: 1.25rem;
    font-weight: 300;

    /* Visual */
    color: ${props => props.theme.gray};
`;

const Error = ({children}) => (
  <StyledError>
      <img src={ErrorImg} alt='Error' width='148' height='123' />
      <Title>We have a problem</Title>
      <Subtitle>{children}</Subtitle>
  </StyledError>
);

export default Error;
