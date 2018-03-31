import * as React from 'react';
import { Icon, Menu, Button } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { AuthStore } from 'stores/authStore';
import { style, media, cssRaw } from 'typestyle';
import * as csstips from 'csstips';
import { branch, ComponentEnhancer, compose, renderComponent } from 'recompose';
import MobileScreenLayout, { default as withMobileScreenLayout } from './withMobileScreenLayout';
import wrap from '../hoc/wrap';
import { History } from 'history';

interface AppProps {
  routingStore: RouterStore;
  authStore: AuthStore;
  children: React.Component
}

const appLayoutStyle = style({
    height: '100%'
});

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

const Header = () => (
  <header className={headerStyle}>
    <Icon size="big" name="target"/>
    <span className={titleStyle}>
      The Place
    </span>
  </header>
);

const Main = ({children}: {children: React.Component}) => (
  <main className={mainStyle}>
    <div className={mainContainerStyle}>
      {children}
    </div>
  </main>
);

const Footer = ({pathname, push}: {pathname: string | null, push: RouterStore['push']}) => (
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
);

const enhance = compose<{}, {}>(
  withMobileScreenLayout,
  inject('routingStore'),
  observer,
);

const AppLayout: React.StatelessComponent = ({routingStore, children}: AppProps) => {
  const { location, push, goBack } = routingStore as RouterStore;
  const pathname = !!location ? location.pathname : null;
  return (
    <div className={appLayoutStyle}>
      <Header/>
      <Main>
        {children}
      </Main>
      <Footer pathname={pathname} push={push}/>
    </div>
)};
export default wrap(enhance(AppLayout));
