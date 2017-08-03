import { observable } from 'mobx';

export class PostStore {
  @observable
  state = {
    src: 'https://react.semantic-ui.com/assets/images/wireframe/image.png'
  };
}

export default new PostStore();