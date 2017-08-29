import { observable, action } from 'mobx';
import { ReviewType } from 'type/Review';
import { UserType } from 'type/User';
import { databaseRef, storage } from '../database/database';

type FeedsState = {
  feeds: ReviewType.Review[]
  loaded: boolean,
  ended: boolean,
  history: ['like' | 'pass', ReviewType.reviewId][]
};

export class FeedStore {
  @observable
  state: FeedsState = {
    feeds: [],
    loaded: false,
    ended: false,
    history: []
  };
  storageRef = storage().ref();

  constructor() {
    this.getFeeds()
  }

  getFeeds() {
    databaseRef.child('reviews').once('value', action((snapshot: firebase.database.DataSnapshot) => {
      if (snapshot) {
        const state: FeedsState = {
          feeds: [],
          loaded: true,
          ended: false,
          history: this.state.history
        };      
        const reviewsFromDB = snapshot.val()
        if (reviewsFromDB !== null) {
          for (const id of Object.keys(reviewsFromDB)) {
            state.feeds.push(reviewsFromDB[id])
          }
        }
        console.log('GET FEEDS');
        this.state = state
      }
    }));
  }

  @action
  likeCard(review: ReviewType.Review, userInfo: UserType) {
    databaseRef.child('reviews').child(review.reviewId).child('likeCount').transaction((count) => { if (count) { count++ ; return count } else { return 1 }})
    databaseRef.child('users').child(userInfo.uid).child('like').child(review.reviewId).set(review)
    this.state.history.push(['like', review.reviewId])
  }
  
  @action
  passCard(review: ReviewType.Review, userInfo: UserType) {
    databaseRef.child('reviews').child(review.reviewId).child('passCount').transaction((count) => { if (count) { count++ ; return count } else { return 1 }})
    databaseRef.child('users').child(userInfo.uid).child('pass').child(review.reviewId).set(review)
    this.state.history.push(['pass', review.reviewId])
  }

  @action
  unDo(userInfo: UserType) {
    const lastDone = this.state.history.pop()
    if (!lastDone) {
      return;
    }
    const likeOrPass = lastDone[0]
    const reviewId = lastDone[1]
    databaseRef.child('reviews').child(reviewId).child(`${likeOrPass}Count`).transaction((count) => {if (count) { count-- ; return count } else { return 1 } })
    databaseRef.child('users').child(userInfo.uid).child(likeOrPass).child(reviewId).set({})
  }
}

export default new FeedStore();