import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Meet from '../components/Meet';
import { searchUsers } from '../ducks/users';

export default connect(
    ({users}) => ({users}),
    dispatch => bindActionCreators({searchUsers}, dispatch)
)(Meet);
