import { observable, action } from 'mobx';
import firebase, { auth, databaseRef } from '../database/database';
import { UserType } from '../type/User'
import { ReviewType } from '../type/Review'

type AuthState = {
  authed: boolean,
  userInfo?: UserType
};

export class AuthStore {
  @observable
  state: AuthState = {
    authed: false
  };

  @action
  public loginWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    auth.signInWithPopup(provider)
  }
  @action
  public setAuthState = (user: firebase.User) => {
    databaseRef.child('users').child(user.uid).once('value', action((snapshot: firebase.database.DataSnapshot) => {
      if (snapshot) {
        const userFromDB = snapshot.val()
        const userInfo: UserType = {
          displayName: userFromDB.displayName,
          email: userFromDB.email,
          photoURL: userFromDB.photoURL,
          uid: userFromDB.uid,
          like: userFromDB.like,
          pass: userFromDB.pass,
          write: userFromDB.write
        }
        const state: AuthState = {
          authed: true,
          userInfo
        }
        this.state = state
      }      
    }))
  }
  @action
  public likeReview = (review: ReviewType.Review) => {
    if (!(this.state.userInfo as UserType).like) {
      (this.state.userInfo as UserType).like = {}
    }
    (this.state.userInfo as UserType).like[review.reviewId] = review
  }
  @action
  public passReview = (review: ReviewType.Review) => {
    if (!(this.state.userInfo as UserType).pass) {
      (this.state.userInfo as UserType).pass = {}
    }
    (this.state.userInfo as UserType).pass[review.reviewId] = review
  }
  @action
  public unDoLike = (reviewId: ReviewType.reviewId) => {
    delete (this.state.userInfo as UserType).like[reviewId]
  }
  @action
  public unDoPass = (reviewId: ReviewType.reviewId) => {
    delete (this.state.userInfo as UserType).pass[reviewId]
  }
}

export default new AuthStore();