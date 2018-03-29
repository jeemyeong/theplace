import { observable, action } from 'mobx';
import firebase, { auth, databaseRef } from '../database/database';
import { UserType } from '../type/User'
import { ReviewType } from '../type/Review'
import UserInfo = firebase.UserInfo;

type AuthState = {
  authed: boolean,
  loading: boolean
  userInfo?: UserType
};

export class AuthStore {
  @observable
  state: AuthState = {
      authed: false,
      loading: true
  };

  constructor() {
      auth.onAuthStateChanged((user: firebase.User) => {
          if (user) {
              const userInfo: firebase.UserInfo = {
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: (user.providerData[0] as UserInfo).photoURL || user.photoURL,
                  uid: user.uid,
                  providerId: user.providerId,
                  phoneNumber: user.phoneNumber
              }
              databaseRef.child('users').child(user.uid).set(userInfo).then(() => this.setAuthState(userInfo))
          } else {
              this.loaded()
          }
      })
  }

  @action
  public loginWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    auth.signInWithPopup(provider)
  }

  @action
  public loaded = () => {
    this.state.loading = false;
  }
  
  @action
  public setAuthState = (user: firebase.UserInfo) => {
    databaseRef.child('users').child(user.uid).once('value', action((snapshot: firebase.database.DataSnapshot) => {
      if (snapshot) {
        const userFromDB = snapshot.val()
        const userInfo: UserType = {
          displayName: userFromDB.displayName,
          email: userFromDB.email,
          uid: userFromDB.uid,
          like: userFromDB.like,
          pass: userFromDB.pass,
          write: userFromDB.write
        }
        const state: AuthState = {
          authed: true,
          loading: false,
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