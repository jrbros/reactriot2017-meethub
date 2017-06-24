import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from '../components/App';
import { askForGeoLocation } from '../ducks/location';

export default connect(
    ({users, geoLocation}) => ({
        users,
        empty: geoLocation.empty,
        location: geoLocation.location
    }),
    dispatch => bindActionCreators({askForGeoLocation}, dispatch)
)(App);
