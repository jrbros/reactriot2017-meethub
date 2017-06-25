import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Meet from '../components/Meet';
import LoaderHOC from '../components/Loader';
import ErrorHOC from '../components/Error';
import EmptyStateHOC from '../components/EmptyState';
import usersConnector from '../connectors/users';
import { searchUsers } from '../ducks/users';


const MeetContainer = connect(
    ({users}) => ({users, loading: users.loading, error: users.error}),
    dispatch => bindActionCreators({searchUsers}, dispatch)
)(ErrorHOC(LoaderHOC(EmptyStateHOC(Meet))));

const container = usersConnector(MeetContainer);

export default container;
