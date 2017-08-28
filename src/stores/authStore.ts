import { observable, action } from 'mobx';
import firebase, { auth } from '../database/database';

export class AuthStore {
  @observable
  authState = {
    authed: false,
  };

  @action
  public loginWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    auth.signInWithPopup(provider)
  }
  @action
  public setAuthState = (user: firebase.User) => {
    const userInfo = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid
    }
    const state = {
      authed: true,
      userInfo
    }
    this.authState = state;
  }
}

export default new AuthStore();