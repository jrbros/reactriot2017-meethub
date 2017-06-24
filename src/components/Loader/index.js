
import React, { Component } from 'react';

const LoaderHOC = (WrappedComponent) =>
  class Loader extends Component {
      render() {
        return (
            this.props.loading ? <div>Loading...</div> :
                <WrappedComponent {...this.props}/>
        );
      }
  };

export default LoaderHOC;
