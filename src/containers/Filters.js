import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Filters from '../components/Filters';
import { searchUsers } from '../ducks/users';

export default connect(
    null,
    dispatch => bindActionCreators({searchUsers}, dispatch)
)(Filters);
