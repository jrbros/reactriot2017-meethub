import React from 'react';
import styled from 'styled-components';

import EmptyImg from './empty@2x.png';

const StyledEmptyState = styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;

    /* Visual */
    background-color: #ffffff;
    border-radius: 50%;
`;

const Title = styled.h3`
    /* Box model */
    margin: 0;

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

const EmptyState = () => (
  <StyledEmptyState>
      <img src={EmptyImg} alt='No results found' width='194' height='96' />
      <Title>No results found</Title>
      <Subtitle>Please update your search and try again</Subtitle>
  </StyledEmptyState>
);

export default EmptyState;
