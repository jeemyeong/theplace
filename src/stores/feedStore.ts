import { observable, action } from 'mobx';
import { ReviewType } from 'type/Review';
import { UserType } from 'type/User';
import { databaseRef, storage } from '../database/database';

type FeedsState = {
  feeds: ReviewType.Review[]
  loaded: boolean,
  ended: boolean
};

export class FeedStore {
  @observable
  state: FeedsState = {
    feeds: [],
    loaded: false,
    ended: false
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
          ended: false
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

  likeCard(review: ReviewType.Review, userInfo: UserType) {
    databaseRef.child('reviews').child(review.reviewId).child('likeCount').transaction((count) => { if (count) { count++ ; return count } else { return 1 }})
    databaseRef.child('users').child(userInfo.uid).child('like').child(review.reviewId).set(review)
  }
  
  passCard(review: ReviewType.Review, userInfo: UserType) {
    databaseRef.child('reviews').child(review.reviewId).child('passCount').transaction((count) => { if (count) { count++ ; return count } else { return 1 }})
    databaseRef.child('users').child(userInfo.uid).child('pass').child(review.reviewId).set(review)
  }
}

export default new FeedStore();