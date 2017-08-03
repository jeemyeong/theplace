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
    return (
      <div>
        <Image src={state.src} size="large" />
      </div>
    );
  }
}

export default Post;
