import React from 'react';
// import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class Meet extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    render() {
        return <div>Welcome</div>;
    }
}

Meet.defaultProps = {
};

Meet.propTypes = {
};

export default connect(
    ({storeToConnect}) => ({...storeToConnect}),
    dispatch => bindActionCreators({}, dispatch)
)(Meet);
