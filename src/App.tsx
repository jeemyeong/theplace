import * as React from 'react';
import withAppLayout from './layout/withAppLayout';
import WriteContainer from './components/write/WriteContainer';
import ReviewContainer from './components/review/ReviewContainer';
import FeedContainer from './components/feed/FeedContainer';
import LikeContainer from './components/like/LikeContainer';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import cardStore from './stores/cardStore';
import authStore, { AuthStore } from './stores/authStore';
import feedStore from './stores/feedStore';
import reviewStore from './stores/reviewStore';
import writeStore from './stores/writeStore';
import createBrowserHistory from 'history/createBrowserHistory';
import { cssRaw, style } from 'typestyle';
import { Provider } from 'mobx-react';
import { Redirect, Route, Router, Switch } from 'react-router';
import { useStrict } from 'mobx';
import withAuth from './layout/withAuth';
import { compose } from 'recompose';
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

useStrict(true);

const history = syncHistoryWithStore(browserHistory, routingStore);

cssRaw(`
@import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');
@import url('https://fonts.googleapis.com/css?family=Saira+Condensed');
`);

export default () => (
  <Provider {...stores} >
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/" component={compose(withAuth, withAppLayout)(FeedContainer)}/>
        <Route path="/reviews/:reviewId" component={compose(withAuth, withAppLayout)(ReviewContainer)}/>
        <Route path="/write" component={compose(withAuth, withAppLayout)(WriteContainer)}/>
        <Route path="/like" component={compose(withAuth, withAppLayout)(LikeContainer)}/>
        <Redirect to="/"/>
      </Switch>
    </Router>
  </Provider>
)