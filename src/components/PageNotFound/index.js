import React from 'react';
import styled from 'styled-components';

import PageNotFoundImg from './notfound@2x.png';

const StyledPageNotFound = styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10rem 0 0;
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

const Error = () => (
  <StyledPageNotFound>
      <img src={PageNotFoundImg} alt='Page not found' width='198' height='77' />
      <Title>Page not found</Title>
      <Subtitle>There's no fish here</Subtitle>
  </StyledPageNotFound>
);

export default Error;
