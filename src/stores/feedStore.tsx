import { observable, action } from 'mobx';
import { ReviewType } from 'type/Review';
import { database, storage } from '../database/database';

type FeedsState = {
  feeds: ReviewType.Review[]
  loaded: boolean
};

export class FeedStore {
  @observable
  state: FeedsState = {
    feeds: [],
    loaded: false
  };
  databaseRef = database.ref();
  storageRef = storage().ref();

  constructor() {
    this.databaseRef.child('reviews').on('value', action((snapshot: firebase.database.DataSnapshot) => {
      if (snapshot) {
        const state: FeedsState = {
          feeds: [],
          loaded: false
        };      
        const reviews = snapshot.val()
        if (reviews !== null) {
          for (const id of Object.keys(reviews)) {
            state.feeds.push(reviews[id])
          }
        }
        state.loaded = true
        this.state = state
      }
    }));
  }
}

export default new FeedStore();