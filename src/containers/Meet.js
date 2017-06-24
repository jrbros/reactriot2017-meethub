import { connect } from 'react-redux';

import Meet from '../components/Meet';
import LoaderHOC from '../components/Loader';

import loaderConnector from '../connectors/loader';

const MeetContainer = connect(
    ({users}) => ({users})
)(Meet);

export default loaderConnector(LoaderHOC(MeetContainer));
