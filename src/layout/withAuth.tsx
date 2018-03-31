import * as React from 'react';
import { branch, compose, renderComponent } from 'recompose';
import withMobileScreenLayout from './withMobileScreenLayout';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../stores/authStore';
import { Image } from 'semantic-ui-react';
import { style } from 'typestyle';
import * as csstips from 'csstips';
import Loading from './Loading';

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

const Auth = withMobileScreenLayout(
  (({loginWithFacebook}: AuthProps) => (
    <div className={AuthStyle}>
      <Image
        className={LoginImageStyle}
        onClick={loginWithFacebook}
        src={facebookImg}
      />
    </div>
  )) as React.StatelessComponent
);

const isAuthCheking = compose<{}, {}>(
  inject('authStore'),
  observer,
  branch(
    ({authStore}: {authStore: AuthStore}) => authStore.state.checking,
    renderComponent(Loading)
  )
);

const isNotAuthed = compose<{}, {}>(
  inject('authStore'),
  observer,
  branch(
    ({authStore}) => !authStore.state.authed,
    renderComponent(({authStore}: {authStore: AuthStore}) => (<Auth loginWithFacebook={authStore.loginWithFacebook} {...authStore}/>))
  )
);

const withAuth = compose<{}, {}>(
  isAuthCheking,
  isNotAuthed
);

export default withAuth;