import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <>
    <CssBaseline />
    <App/>
  </>,
  document.getElementById('app')
);

module.hot.accept();
