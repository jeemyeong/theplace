import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { normalize, setupPage } from 'csstips';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

normalize();
setupPage('#root');

ReactDOM.render(
  <App/>,
  document.getElementById('root') as HTMLElement
);

// registerServiceWorker();
