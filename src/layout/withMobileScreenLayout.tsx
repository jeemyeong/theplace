import * as React from 'react';
import { media, style } from 'typestyle';
import * as csstips from 'csstips';
import wrap from '../hoc/wrap';

const mobileBackgroundStyle = style(csstips.fillParent, csstips.flexRoot, {
  backgroundColor: '#333333',
  textAlign: 'center',
  height: '100vh',
  width: '100vw'
});

const mobileScreenStyle = style(
  media({minWidth: 0, maxWidth: 414}, {
    fontFamily: 'Noto Sans KR',
    backgroundColor: 'white',
    width: '100vw',
    height: '100vh',
  }),
  media({minWidth: 415, minHeight: 736}, {
    fontFamily: 'Noto Sans KR',
    width: '414px',
    height: '736px',
    margin: 'auto',
    backgroundColor: 'white'
  }),
  media({minWidth: 415, maxHeight: 735}, {
    fontFamily: 'Noto Sans KR',
    width: '375px',
    height: '667px',
    margin: 'auto',
    backgroundColor: 'white'
  }),
);

const MobileScreenLayout = ({children}: {children: JSX.Element} | {children: JSX.Element[]}) => (
  <div className={mobileBackgroundStyle}>
    <div className={mobileScreenStyle}>
      {children}
    </div>
  </div>
);

export default wrap(MobileScreenLayout);