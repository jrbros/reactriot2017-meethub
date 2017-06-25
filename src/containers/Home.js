import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../components/Home';
import LoaderHOC from '../components/Loader';


const HomeContainer = connect(
    ({connectedUser}) => ({loading: connectedUser.loading}),
    dispatch => bindActionCreators({}, dispatch)
)(LoaderHOC(Home));

export default HomeContainer;
