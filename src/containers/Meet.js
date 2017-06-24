import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Meet from '../components/Meet';

export default connect(
    ({storeToConnect}) => ({...storeToConnect}),
    dispatch => bindActionCreators({}, dispatch)
)(Meet);
