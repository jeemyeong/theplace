import { observable, action } from 'mobx';
import { ReviewType } from 'type/Review';
import { UserType } from 'type/User';
import { databaseRef, storage } from '../database/database';

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
  storageRef = storage().ref();

  constructor() {
    databaseRef.child('reviews').on('value', action((snapshot: firebase.database.DataSnapshot) => {
      if (snapshot) {
        const state: FeedsState = {
          feeds: [],
          loaded: false
        };      
        const reviewsFromDB = snapshot.val()
        if (reviewsFromDB !== null) {
          for (const id of Object.keys(reviewsFromDB)) {
            state.feeds.push(reviewsFromDB[id])
          }
        }
        state.loaded = true
        this.state = state
      }
    }));
  }

  likeCard(review: ReviewType.Review, userInfo: UserType) {
    databaseRef.child('reviews').child(review.reviewId).child('likeCount').transaction((searches) => { if (searches) { searches++ ; return searches } else { return 1 }})
    databaseRef.child('users').child(userInfo.uid).child('like').child(review.reviewId).set(review)
  }
  
  passCard(review: ReviewType.Review, userInfo: UserType) {
    databaseRef.child('reviews').child(review.reviewId).child('passCount').transaction((searches) => { if (searches) { searches++ ; return searches } else { return 1 }})
    databaseRef.child('users').child(userInfo.uid).child('pass').child(review.reviewId).set(review)
  }
}

export default new FeedStore();