import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Filters from '../components/Filters';
import { searchUsers } from '../ducks/users';
import { updateGeoLocation } from '../ducks/geoLocation';

export default connect(
    ({geoLocation}) => ({geoLocation}),
    dispatch => bindActionCreators({searchUsers, updateGeoLocation}, dispatch)
)(Filters);
