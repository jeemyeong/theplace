import * as React from 'react';
import { Image } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { style } from 'typestyle';
import * as csstips from 'csstips';
const facebookImg = require('./facebook.png');

const AuthStyle = style(csstips.fillParent, csstips.flexRoot, {
});
const LoginImageStyle = style({
  width: '50%',
  margin: 'auto'
});

interface AuthProps {
  loginWithFacebook(): void
}
class Auth extends React.Component<AuthProps, {}> {
  render() {
    return (
      <div className={AuthStyle}>
        <Image
          className={LoginImageStyle}
          onClick={this.props.loginWithFacebook}
          src={facebookImg}
        />
      </div>
    );
  }
}

export default Auth