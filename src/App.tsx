import * as React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

class App extends React.Component<{}, {}> {
  state = { activeItem: 'home' };

  public handleItemClick = (e: React.MouseEvent<EventTarget>, { name }: { name: string }
    ) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    return (
      <div className="App">
        <Menu secondary={true} widths={4} fixed="bottom">
          <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick}>
            <Icon size="large" name="home"/>
          </Menu.Item>
          <Menu.Item name="options" active={activeItem === 'options'} onClick={this.handleItemClick}>
            <Icon size="large" name="options"/>
          </Menu.Item>
          <Menu.Item name="calendar outline" active={activeItem === 'calendar outline'} onClick={this.handleItemClick}>
            <Icon size="large" name="calendar outline"/>
          </Menu.Item>
          <Menu.Item name="users" active={activeItem === 'users'} onClick={this.handleItemClick}>
            <Icon size="large" name="users"/>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default App;
