import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from '../components/App';
import { askForGeoLocation } from '../ducks/geoLocation';
import { getConnectedUserToken } from '../ducks/connectedUser';

export default connect(
    ({routing}) => ({routing}),
    dispatch => bindActionCreators({askForGeoLocation, getConnectedUserToken}, dispatch)
)(App);
