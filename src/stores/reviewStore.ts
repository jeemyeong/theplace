import { observable, action, autorun } from 'mobx';
import { ReviewType } from 'type/Review';
import { databaseRef, storage } from '../database/database';
import authStore from './authStore';
import { UserType } from '../type/User'

type ReviewState = {
  review?: ReviewType.Review
  loading: boolean
  writtingComment: ReviewType.comment
};

export class ReviewStore {
  @observable
  state: ReviewState = {
    loading: true,
    writtingComment: {
      writter: {
        uid: '',
        displayName: '',
      },
      commentText: '',
      cid: ''
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
    };
    this.state.writtingComment.writter = writter
  };

  @action
  public getReview = (id: ReviewType.reviewId): void => {
    this.loading();
    const ref = databaseRef.child('reviews').child(id);
    ref.on('value', action((snapshot: firebase.database.DataSnapshot) => {
      const review = snapshot.val();
      if (!!review) {
        const state = {...this.state, review, loading: false};
        state.review.comments = !!review.comments ? Object.keys(review.comments).map((key, index) => review.comments[key]) : [];
        this.state = state;
      } else {
        const state = {...this.state, loading: false};
        this.state = state
      }
    }));
  };

  @action
  addComment = () => {
    const ref = databaseRef.child('reviews').child((this.state.review as ReviewType.Review).reviewId).child('comments').push();
    const cid = ref.key;
    const comment = {
      ...this.state.writtingComment,
      cid
    };
    ref.set(comment);
    this.state.writtingComment.commentText = '';
  };

  @action
  deleteComment = (comment: ReviewType.comment) => {
    if (comment.writter.uid === this.state.writtingComment.writter.uid) {
      databaseRef.child('reviews').child((this.state.review as ReviewType.Review).reviewId).child('comments').child(comment.cid).set({})
    }
  };

  @action
  writeComment = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.state.writtingComment.commentText = event.currentTarget.value;
  };
  @action
  public loading = (): void => {
    this.state.loading = true;
  }
}

export default new ReviewStore();