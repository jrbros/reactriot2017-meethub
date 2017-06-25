import React, { Component } from 'react';
import styled from 'styled-components';

import Error from './Error';

const Wrapper = styled.div `
    /* Box model */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8rem;
`;

const ErrorHOC = (WrappedComponent) =>
  class Loader extends Component {
      render() {
        const { error, ...props } = this.props;
        return (
            error ?
            <Wrapper>
                <Error>{error}</Error>
            </Wrapper> :
            <WrappedComponent {...props}/>
        );
      }
  };

export default ErrorHOC;
