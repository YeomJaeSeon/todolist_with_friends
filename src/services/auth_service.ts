import { AuthType, firebaseAuth, GoogleProvider } from './firebase';

export type AuthServiceType = {
  login(provider: string): void;
  onAuthStatus(callback: (user: AuthType) => void): void;
  logout(): void;
};

export default class AuthService {
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
  logout() {
    firebaseAuth.signOut();
  }
}
