import * as React from 'react';
import { Icon, Message, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react';

interface AuthProps {
  loginWithFacebook(): void
}
@observer
class Auth extends React.Component<AuthProps, {}> {
  render() {
    return (
      <div
        onClick={this.props.loginWithFacebook}
      >
        Login
      </div>
    );
  }
}

export default Auth