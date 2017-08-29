import * as React from 'react';
import { Icon, Menu, Button } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { AuthStore } from 'stores/authStore';
import { Route, Switch, Redirect } from 'react-router';
import FeedContainer from './feed/FeedContainer';
import Auth from './auth/Auth';
import ReviewContainer from './review/ReviewContainer';
import LikeContainer from './like/LikeContainer';
import { style, cssRaw } from 'typestyle';
import * as csstips from 'csstips';
import { auth, databaseRef } from './database/database';

cssRaw(`
@import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);
@import url('https://fonts.googleapis.com/css?family=Saira+Condensed');
`);

interface AppProps {
  routingStore?: RouterStore;
  authStore?: AuthStore;
}

const AppStyle = style({
  minHeight: '100vh',
  fontFamily: 'Noto Sans KR'
});

const headerStyle = style(csstips.centerCenter, {
  zIndex: 10,
  position: 'absolute',
  height: '6%',
  top: 0,
  width: '100%',
  backgroundColor: 'white',
});

const titleStyle = style(csstips.centerCenter, {
  fontFamily: 'Saira Condensed',
  fontSize: '4vh'
});

const mainStyle = style({
  position: 'absolute',
  top: '6%',
  width: '100%',
  bottom: '6%'
});

const footerStyle = style({
  zIndex: 10,
  position: 'absolute',
  height: '6%',
  bottom: 0,
  width: '100%',
  backgroundColor: 'white',
});

@inject('routingStore')
@inject('authStore')
@observer
class App extends React.Component<AppProps, {}> {
  private removeListener: () => void;
  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged((user: firebase.User) => {
      if (user && !!this.props.authStore) {
        const setAuthState = this.props.authStore.setAuthState
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        }
        const userRef = databaseRef.child('users').child(user.uid)
        userRef.child('displayName').set(user.displayName)
        userRef.child('email').set(user.email)
        userRef.child('photoURL').set(user.photoURL)
        userRef.child('uid').set(user.uid).then(() => setAuthState(user))
      }
    })
  }
  componentWillUnmount() {
    this.removeListener()
  }
  render() {
    const {loginWithFacebook, state} = this.props.authStore as AuthStore;
    if (!state.authed) {
      return (<Auth loginWithFacebook={loginWithFacebook}/>)
    }

    const { location, push, goBack } = this.props.routingStore as RouterStore;
    const pathname = !!location ? location.pathname : null;
    return (
      <div className={AppStyle}>
        <header className={headerStyle}>
          <Icon size="big" name="target"/>
          <span className={titleStyle}>
            The Place
          </span>
        </header>
        <main className={mainStyle}>
          <Switch>
            <Route exact={true} path="/" component={FeedContainer}/>
            <Route path="/reviews/:reviewId" component={ReviewContainer}/>
            <Route path="/like" component={LikeContainer}/>
            <Redirect to="/"/>
          </Switch>
        </main>
        <footer className={footerStyle}>
          <Menu secondary={true} widths={5}>
            <Menu.Item name="feeds" active={pathname === '/'} onClick={() => push('/')}>
              <Icon size="large" name="home"/>
            </Menu.Item>
            <Menu.Item name="users" active={pathname === '/users'} onClick={() => push('/users')}>
              <Icon size="large" name="users"/>
            </Menu.Item>
            <Menu.Item name="write" active={pathname === '/write'} onClick={() => push('/write')}>
              <Icon size="large" name="write"/>
            </Menu.Item>
            <Menu.Item name="map pin" active={pathname === '/map'} onClick={() => push('/map')}>
              <Icon size="large" name="map pin"/>
            </Menu.Item>
            <Menu.Item name="list layout" active={pathname === '/like'} onClick={() => push('/like')}>
              <Icon size="large" name="list layout"/>
            </Menu.Item>
          </Menu>
        </footer>
      </div>
    );
  }
}

export default App;
