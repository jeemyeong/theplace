import * as React from 'react';
import { Divider, Image } from 'semantic-ui-react';

export interface PostProps {
}

const src = 'https://react.semantic-ui.com/assets/images/wireframe/image.png';

class Post extends React.Component<PostProps, {}> {
  render() {
    return (
      <div>
        <Image src={src} size="large" />
        <Image src={src} size="large" />
        <Image src={src} size="large" />
      </div>
    );
  }
}

export default Post;
