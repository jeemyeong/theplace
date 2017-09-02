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
  handleSubmit = () => {
    if (!!this.state.photoFiles) {
      this.addReview();
    }
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
      alert('5점 이하로 평가해주세요!')
    }
  }

  @action
  public clear = () => {
    const state: WriteState = {
      restaurant: '',
      reviewText: '',
      photoFiles: [],
      evaluate: 0,
      writter: this.state.writter
    };
    this.state = state
  }

  addReview = async () => {
    const ref = databaseRef.child('reviews').push()
    const reviewId = ref.key as string
    const imgUrlArray = await this.getUrlsByUploading(this.state.photoFiles, reviewId);
    const review: ReviewType.Review = {
      imgUrlArray: imgUrlArray,
      writter: this.state.writter,
      restaurant: this.state.restaurant,
      reviewText: this.state.reviewText,
      evaluate: this.state.evaluate,
      reviewId: reviewId,
      likeCount: 0,
      passCount: 0,
      stringfiedDate: this.toDateString(new Date())      
    }
    await ref.set(review)
    alert('성공!🖐')
    this.clear()
    return true;
  };

  getUrlsByUploading = async (photoFiles: Dropzone.ImageFile[], reviewId: ReviewType.reviewId) => {
    const imgUrls: ReviewType.imgUrl[] = []
    for (let index = 0; index < photoFiles.length; index++) {
      await this.getUrlByUploading(photoFiles[index], index, reviewId, imgUrls)
    }
    return imgUrls
  }
  
  getUrlByUploading = async(photoFile: Dropzone.ImageFile, index: number, reviewId: ReviewType.reviewId, imgUrls: ReviewType.imgUrl[]) => {
    const filename = reviewId + '(' + index + ')';
    const mountainsRef = this.storageRef.child(filename);
    let downloadURL: ReviewType.imgUrl = '';
    await mountainsRef.put(photoFile).then((snapshot) => { imgUrls[index] = snapshot.metadata.downloadURLs[0]; });
    return;
  }

  pad = (n: number) => (n < 10 ? '0' + n : n)
  public toDateString = (date: Date) => (date.getFullYear() + '/' + this.pad(date.getMonth() + 1) + '/' + this.pad(date.getDate()))
}

export default new WriteStore();