import { AuthType, SinUpType, firebaseAuth } from './firebase';

export type AuthServiceType = {
  signUp(email: string, password: string): SinUpType;
  login(email: string, password: string): SinUpType;
  onAuthStatus(callback?: (user: AuthType) => void): any;
  logout(): void;
  delete(): void;
};

export default class AuthService {
  signUp(email: string, password: string) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  }
  login(email: string, password: string) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }
  onAuthStatus(callback?: (user: AuthType) => void) {
    return firebaseAuth.onAuthStateChanged((user: AuthType) => {
      callback && callback(user);
    });
  }
  logout() {
    firebaseAuth.signOut();
  }
  delete() {
    const deleteUser = firebaseAuth.currentUser;
    deleteUser?.delete().catch((err) => {
      this.logout();
    });
  }
}
