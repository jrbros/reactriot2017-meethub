import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from '../components/App';
import { askForGeoLocation } from '../ducks/geoLocation';

export default connect(
    ({users, geoLocation}) => ({
        users,
        geoLocation
    }),
    dispatch => bindActionCreators({askForGeoLocation}, dispatch)
)(App);
