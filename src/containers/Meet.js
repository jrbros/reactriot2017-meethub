import { connect } from 'react-redux';

import Meet from '../components/Meet';

export default connect(
    ({users}) => ({users})
)(Meet);
