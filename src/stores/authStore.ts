import { observable, action } from 'mobx';
import firebase, { auth, databaseRef } from '../database/database';
import { UserType } from '../type/User'

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
    databaseRef.child('users').child(user.uid).on('value', action((snapshot: firebase.database.DataSnapshot) => {
      if (snapshot) {
        const userFromDB = snapshot.val()
        const userInfo: UserType = {
          displayName: userFromDB.displayName,
          email: userFromDB.email,
          photoURL: userFromDB.photoURL,
          uid: userFromDB.uid,
          like: userFromDB.like,
          pass: userFromDB.pass
        }
        const state: AuthState = {
          authed: true,
          userInfo
        }
        this.state = state
      }      
    }))
  }
}

export default new AuthStore();