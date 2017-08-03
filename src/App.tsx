import * as React from 'react';
import { Icon, Menu, Button } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { Route } from 'react-router';
import Post from './Post';

interface AppProps {
  routing?: RouterStore;
}

@inject('routing')
@observer
class App extends React.Component<AppProps, {}> {
  render() {
    const { location, push, goBack } = this.props.routing as RouterStore;
    const pathname = !!location ? location.pathname : null;
    return (
      <div className="App">
        <Button
          onClick={() => goBack()}
        >
          GoBack
        </Button>
        {pathname}
        <Route exact={true} path="/home" component={Post}/>
        <Menu secondary={true} widths={4} fixed="bottom">
          <Menu.Item name="home" active={pathname === '/home'} onClick={() => push('/home')}>
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
      </div>
    );
  }
}

export default App;
