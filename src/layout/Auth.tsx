import * as React from 'react';
import { Image } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { style } from 'typestyle';
import * as csstips from 'csstips';
const facebookImg = require('../images/facebook.png');

const AuthStyle = style(csstips.fillParent, csstips.flexRoot, {
});
const LoginImageStyle = style({
  width: '50%',
  margin: 'auto'
});

interface AuthProps {
  loginWithFacebook(): void
}

const Auth = ({
  loginWithFacebook
}: AuthProps) => (
  <div className={AuthStyle}>
    <Image
      className={LoginImageStyle}
      onClick={loginWithFacebook}
      src={facebookImg}
    />
  </div>
);

export default Auth