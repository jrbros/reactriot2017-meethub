import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Meet from '../components/Meet';
import LoaderHOC from '../components/Loader';
import ErrorHOC from '../components/Error';
import loaderConnector from '../connectors/loader';
import errorConnector from '../connectors/error';
import { searchUsers } from '../ducks/users';


const MeetContainer = connect(
    ({users}) => ({users}),
    dispatch => bindActionCreators({searchUsers}, dispatch)
)(Meet);

const container = loaderConnector(LoaderHOC(
  errorConnector(ErrorHOC(MeetContainer))
));

export default container;
