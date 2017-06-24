import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
