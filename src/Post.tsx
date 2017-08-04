import * as React from 'react';
import { Divider, Image } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { PostStore } from './stores/postStore';

export interface PostProps {
  postStore?: PostStore;
}

@inject('postStore')
@observer
class Post extends React.Component<PostProps, {}> {
  render() {
    const { state } = this.props.postStore as PostStore;
    const src = !!state ? state.src : '';
    return (
      <div style={containerStyle}>
        <h2 style={textStyle}>
          <span style={spanStyle}>
            Text
          </span>
        </h2>
        <Image src={src} style={cardImageStyle} size="large"/>
      </div>
    );
  }
}

const cardImageStyle = {
  width: '100%',
  position: 'relative' as React.CSSWideKeyword
};

const containerStyle = {
};

const textStyle = {
  zIndex: 100,
  position: 'absolute' as React.CSSWideKeyword,
  color: 'white',
  left: 0,
  top: 200
};

const spanStyle = {
   color: 'white',
   font: 'bold 24px/45px Helvetica, Sans-Serif',
   letterSpacing: '-1px',
   background: 'rgba(0, 0, 0, 0.7)',
   padding: '10px'
};

export default Post;
