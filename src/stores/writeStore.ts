import { observable, action, autorun } from 'mobx';
import { ReviewType } from 'type/Review';
import { databaseRef, storage } from '../database/database';
import * as Dropzone from 'react-dropzone';
import { FormProps } from 'semantic-ui-react/dist/commonjs/collections/Form'
import authStore from './authStore';
import { UserType } from '../type/User'

type WriteState = {
  reviewText: string,
  photoFiles: Dropzone.ImageFile[],
  evaluate: ReviewType.evaluate,
  restaurant: ReviewType.restaurant
  writter: ReviewType.writter
};

export class WriteStore {
  @observable
  state: WriteState = {
    restaurant: '',
    reviewText: '',
    photoFiles: [],
    evaluate: 0,
    writter: {
      uid: '',
      displayName: '',
      photoUrl: '',
    }
  };
  storageRef = storage().ref();

  constructor() {
    autorun(() => {
      if (!!authStore.state.userInfo) {
        this.setUser(authStore.state.userInfo)
      }
    })
  }
  @action
  setUser = (user: UserType) => {
    const writter: ReviewType.writter = {
      uid: user.uid,
      displayName: user.displayName as string,
      photoUrl: user.photoURL as string
    }
    this.state.writter = writter
  }

  @action
  handleSubmit = (event: React.FormEvent<HTMLElement>, data: FormProps) => {
    console.log(event);
    console.log(data);
  }

  @action
  onDrop = (acceptedFiles: Dropzone.ImageFile[], rejectedFiles: Dropzone.ImageFile[]) => {
    if (acceptedFiles[0] !== undefined) {
      this.state.photoFiles = acceptedFiles
    } else {
      // tslint:disable-next-line:no-console
      console.log('Dropzone Error');
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
    const evaluate = Number(event.currentTarget.value);
    if (typeof(evaluate) === 'number' && evaluate <= 5) {
      this.state.evaluate = evaluate;
    } else if (typeof(evaluate) === 'number') {
      alert("5점 이하로 평가해주세요!")
    }
  }

  @action
  public addReview = (imgUrlArray: ReviewType.imgUrl[], author: ReviewType.writter, restaurant: ReviewType.restaurant, reviewText: ReviewType.reviewText, evaluate: ReviewType.evaluate, reviewId: ReviewType.reviewId) => {
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