import * as React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';

interface AppProps {
  routing?: RouterStore;
}

@inject('routing')
@observer
class App extends React.Component<AppProps, {}> {
  state = { activeItem: 'home' };

  public handleItemClick = (e: React.MouseEvent<EventTarget>, { name }: { name: string }
    ) => this.setState({ activeItem: name })
 
  render() {
    const { location, push, goBack } = this.props.routing as RouterStore;
    const { activeItem } = this.state;
    const pathname = !!location ? location.pathname : null;
    return (
      <div className="App">
        <button
          onClick={() => goBack()}
        >
          GoBack
        </button>
        
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
