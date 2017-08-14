import { observable, action } from 'mobx';
import { ReviewType } from 'type/Review';

type ReviewState = {
  review: ReviewType
  loaded: boolean
};

export class ReviewStore {
  @observable
  state: ReviewState = {
    review: {
      imgUrlArray: [],
      author: {
        id: -1,
        nickname: '',
        profileImgUrl: '',
      },
      restaurant: '',
      review: '',
      evaluate: -1,
      reviewId: -1,
    },
    loaded: false
  };

  @action
  public setReview = (review: ReviewType): void => {
    this.state.review = review;
    this.state.loaded = true;
  }
}

export default new ReviewStore();