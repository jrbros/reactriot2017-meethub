import { connect } from 'react-redux';

import Meet from '../components/Meet';
import LoaderHOC from '../components/Loader';
import ErrorHOC from '../components/Error';
import loaderConnector from '../connectors/loader';
import errorConnector from '../connectors/error';

const MeetContainer = connect(
    ({users}) => ({users: users.usersInformations})
)(Meet);

const container = loaderConnector(LoaderHOC(
  errorConnector(ErrorHOC(MeetContainer))
));

export default container;
