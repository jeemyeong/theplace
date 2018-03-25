import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './AppLayout';
import feedStore from './stores/feedStore';
import reviewStore from './stores/reviewStore';
import authStore from './stores/authStore';
import cardStore from './stores/cardStore';
import writeStore from './stores/writeStore';
import { useStrict } from 'mobx';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Redirect, Route, Router, Switch } from 'react-router';
import { normalize, setupPage } from 'csstips';

normalize();
setupPage('#root');

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  // Key can be whatever you want
  routingStore,
  feedStore,
  reviewStore,
  authStore,
  cardStore,
  writeStore,
};

const history = syncHistoryWithStore(browserHistory, routingStore);

// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import WriteContainer from './write/WriteContainer';
import FeedContainer from './feed/FeedContainer';
import LikeContainer from './like/LikeContainer';
import ReviewContainer from './review/ReviewContainer';

useStrict(true);

ReactDOM.render(
  <Provider {...stores} >
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/" component={FeedContainer}/>
        <Route path="/reviews/:reviewId" component={ReviewContainer}/>
        <Route path="/write" component={WriteContainer}/>
        <Route path="/like" component={LikeContainer}/>
        <Redirect to="/"/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// registerServiceWorker();
