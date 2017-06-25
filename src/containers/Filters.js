import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Filters from '../components/Filters';
import { searchUsers } from '../ducks/users';
import { updateLanguages } from '../ducks/languages';
import { updateGeoLocation } from '../ducks/geoLocation';
import { activeSearch, disableSearch } from '../ducks/app';

export default connect(
    ({geoLocation, languages, app}) => ({geoLocation, languages}),
    dispatch => bindActionCreators({
      searchUsers,
      updateGeoLocation,
      updateLanguages,
      activeSearch,
      disableSearch
    }, dispatch)
)(Filters);
