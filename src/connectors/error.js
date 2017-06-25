import { connect } from 'react-redux';

const errorConnector = connect(
  ({users}, {children}) => ({
    error: users.error,
    children
  }),
  null,
  null
);

export default errorConnector;
