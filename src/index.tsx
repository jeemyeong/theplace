import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import postStore from './stores/postStore';
import { useStrict } from 'mobx';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = [
  // Key can be whatever you want
  { routing: routingStore },
  { posting: postStore }
  // ...other stores
];

const history = syncHistoryWithStore(browserHistory, routingStore);

// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

useStrict(true);

ReactDOM.render(
  <Provider postStore={...stores} >
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// registerServiceWorker();
