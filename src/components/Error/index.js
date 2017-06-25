import React, { Component } from 'react';

const ErrorHOC = (WrappedComponent) =>
  class Loader extends Component {
      render() {
        const { error, ...props } = this.props;
        return (
            error ? <div>{error}</div> :
                <WrappedComponent {...props}/>
        );
      }
  };

export default ErrorHOC;
