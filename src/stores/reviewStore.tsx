import { observable, action } from 'mobx';
import { ReviewType } from 'type/Review';

type ReviewState = {
  review: ReviewType
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
      empty: true    
    }
  };

  @action
  public setReview = (review: ReviewType): void => {
    this.state.review = review;
  }

}

export default new ReviewStore();