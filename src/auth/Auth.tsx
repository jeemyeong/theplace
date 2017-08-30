import * as React from 'react';
import { Image } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { style } from 'typestyle';
import * as csstips from 'csstips';

const AuthStyle = style(csstips.fillParent, csstips.flexRoot, {
});
const LoginImageStyle = style({
  width: '50%',
  margin: 'auto'
});

interface AuthProps {
  loginWithFacebook(): void
}
@observer
class Auth extends React.Component<AuthProps, {}> {
  render() {
    return (
      <div className={AuthStyle}>
        <Image
          className={LoginImageStyle}
          onClick={this.props.loginWithFacebook}
          src="https://scontent.ficn1-1.fna.fbcdn.net/v/t39.2365-6/17639236_1785253958471956_282550797298827264_n.png?oh=3f070b94fe0c2a2814582e91e950d6f8&oe=5A1358EA"
        />
      </div>
    );
  }
}

export default Auth