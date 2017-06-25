import { connect } from 'react-redux';

export default connect(
  ({users}, {children}) => ({
    collectionLength: users.usersInformations.length,
    children
  }),
  null,
  null
);
