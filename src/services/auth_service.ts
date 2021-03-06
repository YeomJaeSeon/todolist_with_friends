import { AuthType, SinUpType, firebaseAuth } from './firebase';

export type AuthServiceType = {
  signUp(email: string, password: string): SinUpType;
  login(email: string, password: string): SinUpType;
  getLoginStatus(callback?: (user: AuthType) => void): any;
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
  // 유저의 로그인 상태 받아옴
  getLoginStatus(callback?: (user: AuthType) => void) {
    return firebaseAuth.onAuthStateChanged((user: AuthType) => {
      callback && callback(user);
    });
  }
  logout() {
    firebaseAuth.signOut();
  }
  // 회원 탈퇴. 유저 회원가입 정보 삭제(auth 삭제임. db삭제아님)
  delete() {
    const deleteUser = firebaseAuth.currentUser;
    deleteUser?.delete().catch(() => {
      this.logout();
    });
  }
}
