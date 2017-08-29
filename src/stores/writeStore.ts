import { observable, action } from 'mobx';
import { ReviewType } from 'type/Review';
import { databaseRef, storage } from '../database/database';

type WriteState = {
  review?: ReviewType.Review
  loading: boolean
};

export class WriteStore {
  @observable
  state: WriteState = {
    loading: true
  };
  storageRef = storage().ref();

  @action
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

export default new WriteStore();