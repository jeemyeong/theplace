import { observable } from 'mobx';

export class PostStore {
  @observable
  state = [];
}

export default new PostStore();