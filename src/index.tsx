import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';

import AppState from './stores/AppState';

import './index.css';

ReactDOM.render(
  <Provider
    appState={AppState}
  >
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
