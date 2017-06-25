import React, { Component } from 'react';
import styled from 'styled-components';

import EmptyStateVisual from './EmptyState';

const Wrapper = styled.div `
    /* Box model */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
`;

const EmptyStateHOC = (WrappedComponent) =>
  class EmptyState extends Component {
      render() {
        const { collectionLength, ...props} = this.props;
        return (
            collectionLength > 0 ? <WrappedComponent {...props}/> :
            <Wrapper>
                <EmptyStateVisual />
            </Wrapper>
        );
      }
  };

export default EmptyStateHOC;
