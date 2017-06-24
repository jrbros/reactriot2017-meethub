import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
