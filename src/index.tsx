import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './layout/AppLayout';
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
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import WriteContainer from './routes/write/WriteContainer';
import FeedContainer from './routes/feed/FeedContainer';
import LikeContainer from './routes/like/LikeContainer';
import ReviewContainer from './routes/review/ReviewContainer';
import { cssRaw } from 'typestyle';

// normalize();
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

cssRaw(`
@import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');
@import url('https://fonts.googleapis.com/css?family=Saira+Condensed');
`);

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
