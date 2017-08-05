import { observable } from 'mobx';

export class PostStore {
  @observable
  state = {
    src: 'https://instagram.ficn1-1.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/c113.0.854.854/20479257_820171101484532_5072064752591568896_n.jpg'
  };
}

export default new PostStore();