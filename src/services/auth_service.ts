import { AuthType, SinUpType, firebaseAuth, GoogleProvider } from './firebase';

export type AuthServiceType = {
  signUp(email: string, password: string): SinUpType;
  login(provider: string): void;
  onAuthStatus(callback: (user: AuthType) => void): void;
  logout(): void;
};

export default class AuthService {
  signUp(email: string, password: string) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  }
  login(provider: string) {
    firebaseAuth.signInWithPopup(this.createProvider(provider));
  }
  createProvider(provider: string) {
    switch (provider) {
      case 'Google':
        return GoogleProvider;
      default:
        throw new Error(`${provider}: 적절치 못한 로그인 시도입니다.`);
    }
  }
  onAuthStatus(callback: (user: AuthType) => void) {
    firebaseAuth.onAuthStateChanged((user: AuthType) => {
      callback(user);
    });
  }
  isUser() {
    const user = firebaseAuth.currentUser;
  }
  logout() {
    firebaseAuth.signOut();
  }
}
