import * as React from 'react';
import withMobileScreenLayout from './withMobileScreenLayout';
import { style } from 'typestyle';
import { Icon } from 'semantic-ui-react';

const loadingWrapperStyle = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 10
});

export const Spinner = () => (
  <div className={loadingWrapperStyle}>
    <Icon loading={true} name="spinner" size="big" />
  </div>
)

export default withMobileScreenLayout(Spinner)