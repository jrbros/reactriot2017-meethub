import React, { Component } from 'react';

import Spinner from './Spinner';

const LoaderHOC = (WrappedComponent) =>
  class Loader extends Component {
      render() {
        const { loading, ...props} = this.props;
        return (
            loading ? <Spinner />:
                <WrappedComponent {...props}/>
        );
      }
  };

export default LoaderHOC;
