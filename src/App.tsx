import * as React from 'react';
import { Icon, Menu, Button } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { Route } from 'react-router';
import FeedContainer from './feed/FeedContainer';
import { style, cssRaw } from 'typestyle';
import * as csstips from 'csstips';

cssRaw(`
@import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);
@import url('https://fonts.googleapis.com/css?family=Saira+Condensed');
`);

interface AppProps {
  routing?: RouterStore;
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

@inject('routing')
@observer
class App extends React.Component<AppProps, {}> {
  render() {
    const { location, push, goBack } = this.props.routing as RouterStore;
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
          <Route exact={true} path="/feeds" component={FeedContainer}/>
        </main>
        <footer className={footerStyle}>
          <Menu secondary={true} widths={4}>
            <Menu.Item name="feeds" active={pathname === '/feeds'} onClick={() => push('/feeds')}>
              <Icon size="large" name="home"/>
            </Menu.Item>
            <Menu.Item name="options" active={pathname === '/options'} onClick={() => push('/options')}>
              <Icon size="large" name="options"/>
            </Menu.Item>
            <Menu.Item name="calendar outline" active={pathname === '/calendar'} onClick={() => push('/calendar')}>
              <Icon size="large" name="calendar outline"/>
            </Menu.Item>
            <Menu.Item name="users" active={pathname === '/users'} onClick={() => push('/users')}>
              <Icon size="large" name="users"/>
            </Menu.Item>
          </Menu>
        </footer>
      </div>
    );
  }
}

export default App;
