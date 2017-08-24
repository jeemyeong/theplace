import { observable, action } from 'mobx';
import { ReviewType } from 'type/Review';
import { database, storage } from '../database/database';

type ReviewState = {
  review: ReviewType.Review
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
      reviewText: '',
      evaluate: -1,
      reviewId: '',
    },
    loaded: false
  };
  databaseRef = database.ref();
  storageRef = storage.ref();

  constructor() {
    this.databaseRef.child('reviews').on('value', action((snapshot: firebase.database.DataSnapshot) => {
      if (snapshot) {
        const list = snapshot.val();
        const todos = [];
        if (list !== null) {
          for (const key of Object.keys(list)) {
            todos.push({
              id: key,
              text: list[key]
            });
          }
        }
        console.log(todos);
      }
    }));
  }
  
  @action
  public getReview = (id: ReviewType.reviewId): void => {
    const ref = this.databaseRef.child('reviews').child(id);    
    ref.once('value', action((snapshot: firebase.database.DataSnapshot) => {
      if (snapshot) {
        const review = snapshot.val();
        // this.state.review = review;
        console.log(review);
        this.state.loaded = true;
      }
    }));
  }
  
  public addReview = (imgUrlArray: ReviewType.imgUrl[], author: ReviewType.author, restaurant: ReviewType.restaurant, reviewText: ReviewType.reviewText, evaluate: ReviewType.evaluate, reviewId: ReviewType.reviewId) => {
    const ref = this.databaseRef.child('reviews').push();
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