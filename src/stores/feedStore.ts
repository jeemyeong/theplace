import { observable, action } from 'mobx';
import { ReviewType } from 'type/Review';
import { UserType } from 'type/User';
import { databaseRef, storage } from '../database/database';
import { toJS } from 'mobx';
import authStore from './authStore';

type FeedsState = {
  feeds: ReviewType.Review[],
  currentFeed?: ReviewType.Review,
  loaded: boolean,
  ended: boolean,
  history: {
    type: 'like' | 'pass',
    review: ReviewType.Review
  }[],
  containerSize: { x: number, y: number },
  alert: {left: boolean, right: boolean}
};

export class FeedStore {
  @observable
  state: FeedsState = {
    feeds: [],
    loaded: false,
    ended: false,
    history: [],
    containerSize: { x: 375, y: 375 },
    alert: {
      left: false,
      right: false
    }
  };
  storageRef = storage().ref();

  constructor() {
    this.getFeeds()
  }

  getFeeds() {
    databaseRef.child('reviews').once('value', action((snapshot: firebase.database.DataSnapshot) => {
      if (snapshot) {
        const state: FeedsState = {
          ...this.state,
          loaded: true,
          ended: false,
          history: this.state.history
        };      
        const reviewsFromDB = snapshot.val();
        if (reviewsFromDB !== null) {
          for (const id of Object.keys(reviewsFromDB)) {
            state.feeds.push(reviewsFromDB[id])
          }
          state.currentFeed = state.feeds.pop();
        }
        this.state = state
      }
    }));
  }

  @action
  likeCard = (userInfo: UserType) => {
    const { currentFeed } = this.state;
    if (!currentFeed) {
      return;
    }
    databaseRef.child('reviews').child(currentFeed.reviewId).child('likeCount').transaction((count) => { if (count) { count++ ; return count } else { return 1 }});
    databaseRef.child('users').child(userInfo.uid).child('like').child(currentFeed.reviewId).set(toJS(currentFeed));
    authStore.likeReview(toJS(currentFeed));
    const state = {
      ...this.state,
      feeds: [...this.state.feeds],
      history: [...this.state.history]
    };
    state.history.push({type: 'like', review: currentFeed});
    state.currentFeed = state.feeds.pop();
    state.alert.right = true;
    this.state = state;

    setTimeout(this.closeAlert, 1000);
  };

  @action
  passCard = (userInfo: UserType) => {
    const { currentFeed } = this.state;
    if (!currentFeed) {
      return;
    }
    databaseRef.child('reviews').child(currentFeed.reviewId).child('passCount').transaction((count) => { if (count) { count++ ; return count } else { return 1 }});
    databaseRef.child('users').child(userInfo.uid).child('pass').child(currentFeed.reviewId).set(toJS(currentFeed));
    authStore.passReview(toJS(currentFeed));
    const state = {
      ...this.state,
      feeds: [...this.state.feeds],
      history: [...this.state.history]
    };
    state.history.push({type: 'pass', review: currentFeed});
    state.currentFeed = state.feeds.pop();
    state.alert.left = true;
    this.state = state;

    setTimeout(this.closeAlert, 1000);
  };

  @action
  closeAlert = () => {
    this.state = {
      ...this.state,
      alert: {
        left: false,
        right: false
      }
    }
  };

  @action
  unDo = (userInfo: UserType) => {
    const lastDone = this.state.history.pop();
    if (!lastDone) {
      return;
    }
    const { type, review } = lastDone;
    const { reviewId } = review;
    databaseRef.child('reviews').child(reviewId).child(`${type}Count`).transaction((count) => {if (count) { count-- ; return count } else { return 1 } });
    databaseRef.child('users').child(userInfo.uid).child(type).child(reviewId).set({});
    if (type === 'like') {
      authStore.unDoLike(reviewId)
    } else {
      authStore.unDoPass(reviewId)
    }
    const state = {
      ...this.state,
      feeds: [...this.state.feeds],
      history: [...this.state.history]
    };
    if (!!state.currentFeed) {
      state.feeds.push(state.currentFeed);
    }
    state.currentFeed = lastDone.review;
    this.state = state;
  };
}

export default new FeedStore();