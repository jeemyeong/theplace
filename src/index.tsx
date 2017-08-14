import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import feedStore from './stores/feedStore';
import reviewStore from './stores/reviewStore';
import { useStrict } from 'mobx';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import { normalize, setupPage } from 'csstips';

normalize();
setupPage('#root');

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  // Key can be whatever you want
  routingStore,
  feedStore,
  reviewStore
  // ...other stores
};

const history = syncHistoryWithStore(browserHistory, routingStore);

// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

useStrict(true);

ReactDOM.render(
  <Provider {...stores} >
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// registerServiceWorker();
