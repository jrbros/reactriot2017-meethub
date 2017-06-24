import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Meet from '../components/Meet';
import { searchUsers } from '../ducks/users';
import { askForGeoLocation } from '../ducks/location';

export default connect(
    ({users, location}) => ({users, location}),
    dispatch => bindActionCreators({searchUsers, askForGeoLocation}, dispatch)
)(Meet);
