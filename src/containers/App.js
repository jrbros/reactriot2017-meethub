import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';
import { askForGeoLocation } from '../ducks/geoLocation';
import { getConnectedUserToken } from '../ducks/connectedUser';

export default withRouter(connect(
    ({app, routing}) => ({
        searchIsActive: app.searchIsActive,
        pathname: routing.location.pathname
    }),
    dispatch => bindActionCreators({askForGeoLocation, getConnectedUserToken}, dispatch)
)(App));
