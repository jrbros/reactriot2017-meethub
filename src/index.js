import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css/normalize.css';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import './global-styles';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
