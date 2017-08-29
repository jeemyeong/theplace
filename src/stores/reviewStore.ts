import { observable, action } from 'mobx';
import { ReviewType } from 'type/Review';
import { databaseRef, storage } from '../database/database';

type ReviewState = {
  review?: ReviewType.Review
  loading: boolean
};

export class ReviewStore {
  @observable
  state: ReviewState = {
    loading: true
  };
  storageRef = storage().ref();

  @action
  public getReview = (id: ReviewType.reviewId): void => {
    this.loading()
    const ref = databaseRef.child('reviews').child(id);
    ref.once('value', action((snapshot: firebase.database.DataSnapshot) => {
      const review = snapshot.val();
      if (review) {
        const state = {review, loading: false}
        this.state = state;
      } else {
        const state = {loading: false}
        this.state = state
      }
    }));
  }

  @action
  public loading = (): void => {
    this.state.loading = true;
  }
  
  public addReview = (imgUrlArray: ReviewType.imgUrl[], author: ReviewType.user, restaurant: ReviewType.restaurant, reviewText: ReviewType.reviewText, evaluate: ReviewType.evaluate, reviewId: ReviewType.reviewId) => {
    const ref = databaseRef.child('reviews').push();
    const review = {
      author,
      restaurant,
      reviewText,
      evaluate,
      reviewId,
      id: ref.key
    };
    ref.set({review});
  }
}

export default new ReviewStore();