import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Filters from '../components/Filters';
import { searchUsers } from '../ducks/users';
import { updateLanguages } from '../ducks/languages';
import { updateGeoLocation } from '../ducks/geoLocation';

export default connect(
    ({geoLocation, languages}) => ({geoLocation, languages}),
    dispatch => bindActionCreators({searchUsers, updateGeoLocation, updateLanguages}, dispatch)
)(Filters);
