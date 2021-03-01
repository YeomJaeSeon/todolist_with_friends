import { AuthType, SinUpType, firebaseAuth, GoogleProvider } from './firebase';

export type AuthServiceType = {
  signUp(email: string, password: string): SinUpType;
  login(email: string, password: string): SinUpType;
  onAuthStatus(callback?: (user: AuthType) => void): void;
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
  createProvider(provider: string) {
    switch (provider) {
      case 'Google':
        return GoogleProvider;
      default:
        throw new Error(`${provider}: 적절치 못한 로그인 시도입니다.`);
    }
  }
  onAuthStatus(callback?: (user: AuthType) => void) {
    firebaseAuth.onAuthStateChanged((user: AuthType) => {
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
