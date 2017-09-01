import { observable, action } from 'mobx';
import { ReviewType } from 'type/Review';
import { databaseRef, storage } from '../database/database';
import * as Dropzone from 'react-dropzone';
import { FormProps } from 'semantic-ui-react/dist/commonjs/collections/Form'

type WriteState = {
  reviewText: string,
  photoFiles: Dropzone.ImageFile[],
  evaluate: ReviewType.evaluate,
  restaurant: ReviewType.restaurant
};

export class WriteStore {
  @observable
  state: WriteState = {
    restaurant: '',
    reviewText: '',
    photoFiles: [],
    evaluate: 0,
  };
  storageRef = storage().ref();

  @action
  handleSubmit = (event: React.FormEvent<HTMLElement>, data: FormProps) => {
    console.log(event);
    console.log(data);
  }

  @action
  onDrop = (acceptedFiles: Dropzone.ImageFile[], rejectedFiles: Dropzone.ImageFile[]) => {
    console.log(acceptedFiles);
    if (acceptedFiles[0] !== undefined) {
      this.state.photoFiles = acceptedFiles
    } else {
      console.log('ERROR');
    }
  }

  @action
  public writeRestaurant = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.state.restaurant = event.currentTarget.value;
  }

  @action
  public writeReviewText = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.state.reviewText = event.currentTarget.value;
  }
  @action
  public writeEvaluate = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.state.evaluate = Number(event.currentTarget.value);
  }

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