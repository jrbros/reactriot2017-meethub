import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Meet from '../components/Meet';
import LoaderHOC from '../components/Loader';
import ErrorHOC from '../components/Error';
import EmptyStateHOC from '../components/EmptyState';
import loaderConnector from '../connectors/loader';
import usersConnector from '../connectors/users';
import errorConnector from '../connectors/error';
import { searchUsers } from '../ducks/users';


const MeetContainer = connect(
    ({users, app}) => ({users, searchIsActive: app.searchIsActive}),
    dispatch => bindActionCreators({searchUsers}, dispatch)
)(Meet);

const container = loaderConnector(LoaderHOC(
  errorConnector(ErrorHOC(
  usersConnector(EmptyStateHOC(MeetContainer))
))));

export default container;
