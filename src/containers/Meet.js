import { connect } from 'react-redux';

import Meet from '../components/Meet';
import LoaderHOC from '../components/Loader';

import loaderConnector from '../connectors/loader';

export default loaderConnector(connect(
    ({users}) => ({users})
)(LoaderHOC(Meet)));
