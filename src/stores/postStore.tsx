import { observable } from 'mobx';

export class PostStore {
  @observable
  state = {
    src: 'https://photos-1.dropbox.com/t/2/AAD475_Ezp6ePoaJK4g2TL7R9in_P8m7SvEdyy86exmstA/12/343512610/png/32x32/3/1501880400/0/2/1_pizza.PNG/EPPZ4tcCGI3lDSAHKAc/P7v0yz-WZIwe15EofJMT8dYrDbQ8ufNbC2RtDXrQyhk?dl=0&size=2048x1536&size_mode=3'
  };
}

export default new PostStore();