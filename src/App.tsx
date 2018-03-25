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
import WriteContainer from './write/WriteContainer';
import { style, media, cssRaw } from 'typestyle';
import * as csstips from 'csstips';
import { auth, databaseRef } from './database/database';
import UserInfo = firebase.UserInfo;

cssRaw(`
@import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);
@import url('https://fonts.googleapis.com/css?family=Saira+Condensed');
`);

interface AppProps {
  routingStore?: RouterStore;
  authStore?: AuthStore;
}

const loadingWrapperStyle = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 10
})

const BackgroundStyle = style(csstips.fillParent, csstips.flexRoot, {
  backgroundColor: '#333333'
});

const AppStyle = style(
  media({minWidth: 0, maxWidth: 414}, {
    fontFamily: 'Noto Sans KR',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  }),
  media({minWidth: 415, minHeight: 736}, {
    fontFamily: 'Noto Sans KR',
    width: '414px',
    height: '736px',
    margin: 'auto',
    backgroundColor: 'white'
  }),
  media({minWidth: 415, maxHeight: 735}, {
    fontFamily: 'Noto Sans KR',
    width: '375px',
    height: '667px',
    margin: 'auto',
    backgroundColor: 'white'
  }),
);

const headerStyle = style(csstips.centerCenter, {
  zIndex: 10,
  position: 'relative',
  height: '6%',
  top: 0,
  width: '100%',
  backgroundColor: 'white',
});

const titleStyle = style(csstips.centerCenter, {
  fontFamily: 'Saira Condensed',
  fontSize: '2em'
});

const mainStyle = style({
  position: 'relative',
  top: 0,
  height: '88%',
  width: '100%',
  backgroundColor: 'white',
});

const mainContainerStyle = style(
  csstips.scrollY, {
  paddingTop: 30,
  paddingBottom: 30,
  width: '100%',
  height: '100%',
  backgroundColor: 'white'
});

const footerStyle = style({
  zIndex: 10,
  position: 'relative',
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
        const userInfo: firebase.UserInfo = {
          displayName: user.displayName,
          email: user.email,
          photoURL: (user.providerData[0] as UserInfo).photoURL || user.photoURL,
          uid: user.uid,
          providerId: user.providerId,
          phoneNumber: user.phoneNumber
        }
        databaseRef.child('users').child(user.uid).set(userInfo).then(() => setAuthState(userInfo))
      } else {
        (this.props.authStore as AuthStore).loaded()
      }
    })
  }
  render() {
    const {loginWithFacebook, state} = this.props.authStore as AuthStore;
    if (!!state.loading) {
      return (
        <div className={BackgroundStyle}>
          <div className={AppStyle}>
            <div className={loadingWrapperStyle}>
                <Icon loading={true} name="spinner" size="big" />
            </div>
          </div>
        </div>
      )
    }
    if (!state.authed) {
      return (
        <div className={BackgroundStyle}>
          <div className={AppStyle}>
            <Auth loginWithFacebook={loginWithFacebook}/>
          </div>
        </div>
      )
    }

    const { location, push, goBack } = this.props.routingStore as RouterStore;
    const pathname = !!location ? location.pathname : null;
    return (
      <div className={BackgroundStyle}>
        <div className={AppStyle}>
          <header className={headerStyle}>
            <Icon size="big" name="target"/>
            <span className={titleStyle}>
              The Place
            </span>
          </header>
          <main className={mainStyle}>
            <div className={mainContainerStyle}>
              <Switch>
                <Route exact={true} path="/" component={FeedContainer}/>
                <Route path="/reviews/:reviewId" component={ReviewContainer}/>
                <Route path="/write" component={WriteContainer}/>
                <Route path="/like" component={LikeContainer}/>
                <Redirect to="/"/>
              </Switch>
            </div>
          </main>
          <footer className={footerStyle}>
            <Menu secondary={true} widths={3}>
              <Menu.Item name="feeds" active={pathname === '/'} onClick={() => push('/')}>
                <Icon size="large" name="home"/>
              </Menu.Item>
              {/* <Menu.Item name="users" active={pathname === '/users'} onClick={() => push('/users')}>
                <Icon size="large" name="users"/>
              </Menu.Item> */}
              <Menu.Item name="write" active={pathname === '/write'} onClick={() => push('/write')}>
                <Icon size="large" name="write"/>
              </Menu.Item>
              {/* <Menu.Item name="map pin" active={pathname === '/map'} onClick={() => push('/map')}>
                <Icon size="large" name="map pin"/>
              </Menu.Item> */}
              <Menu.Item name="list layout" active={pathname === '/like'} onClick={() => push('/like')}>
                <Icon size="large" name="list layout"/>
              </Menu.Item>
            </Menu>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
