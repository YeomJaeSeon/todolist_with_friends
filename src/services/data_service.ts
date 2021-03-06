import { firebaseDatabase } from './firebase';
import axios from 'axios';

type CallbackType = (value: any) => void;

export type DatabaseType = {
  writeCard(uid: string | null, id: string, today: string): any;
  writeTodo(uid: string | null, id: string, todoId: number, todo: string): any;
  removeCard(uid: string | null, id: string): any;
  removeTodo(uid: string | null, id: string, todoId: number): any;
  updateTodo(
    uid: string | null,
    id: string,
    todoId: number,
    updateTodo: string
  ): any;
  toggleTodo(
    uid: string | null,
    id: string,
    todoId: number,
    checked: boolean
  ): any;
  updateCalendar(uid: string | null, id: string, today: string): void;
  changeToStart(
    uid: string | null,
    id: string,
    current: boolean,
    prevCardId?: string
  ): void;
  dataSync(uid: string | null, update?: CallbackType): void;
  createUser(uid: string | null, userName: string): void;
  updateTime(uid: string | null, time: number): void;
  timeSync(uid: string | null, update?: CallbackType): any;
  getUserDatas(show?: CallbackType): any;
  getLoginUserData(uid: string | null, get?: CallbackType): any;
  changeCharacterName(uid: string | null, newUserName: string): void;
  deleteUserInfo(uid: string | null): void;
  deleteUserData(uid: string | null): void;
};

export default class Database {
  // card생성
  writeCard(uid: string | null, id: string, today: string) {
    const CardData = {
      id: id,
      current: false,
      today: today,
      todos: '',
    };
    return axios.put(
      `https://todolist-competition-default-rtdb.firebaseio.com/users/${uid}/${id}.json`,
      CardData
    );
  }

  // todo 생성
  writeTodo(uid: string | null, id: string, todoId: number, todo: string) {
    const TodoData = {
      id: todoId,
      thing: todo,
      checked: false,
    };

    return axios.put(
      `https://todolist-competition-default-rtdb.firebaseio.com/users/${uid}/${id}/todos/${todoId}.json`,
      TodoData
    );
  }
  // card삭제시 데이터도 삭제
  removeCard(uid: string | null, id: string) {
    return axios.delete(
      `https://todolist-competition-default-rtdb.firebaseio.com/users/${uid}/${id}.json`
    );
  }
  // todo삭제시 데이터도 삭제
  removeTodo(uid: string | null, id: string, todoId: number) {
    return axios.delete(
      `https://todolist-competition-default-rtdb.firebaseio.com/users/${uid}/${id}/todos/${todoId}.json`
    );
  }
  // 할일 업데이트 변경사항 저장
  updateTodo(
    uid: string | null,
    id: string,
    todoId: number,
    updateTodo: string
  ) {
    return axios.patch(
      `https://todolist-competition-default-rtdb.firebaseio.com/users/${uid}/${id}/todos/${todoId}.json`,
      {
        thing: updateTodo,
      }
    );
  }
  // todo의 토글상태 저장
  toggleTodo(uid: string | null, id: string, todoId: number, checked: boolean) {
    return axios.patch(
      `https://todolist-competition-default-rtdb.firebaseio.com/users/${uid}/${id}/todos/${todoId}.json`,
      { checked: checked }
    );
  }
  // 입력한 캘린더 월일 저장
  updateCalendar(uid: string | null, id: string, today: string) {
    return axios.patch(
      `https://todolist-competition-default-rtdb.firebaseio.com/users/${uid}/${id}.json`,
      {
        today: today,
      }
    );
  }
  // 카드의 옮김 상태 데이터 저장
  changeToStart(
    uid: string | null,
    id: string,
    current: boolean,
    prevCardId?: string
  ) {
    prevCardId &&
      firebaseDatabase.ref(`users/${uid}/${prevCardId}`).update({
        current: !current,
      });
    firebaseDatabase.ref(`users/${uid}/${id}`).update({
      current: current,
    });
  }
  // 유저의 데이터 실시간 변경 반영
  dataSync(uid: string | null, update?: CallbackType) {
    const datasRef = firebaseDatabase.ref(`users/${uid}`);
    datasRef.once('value', (snapshot) => {
      update && update(snapshot.val());
    });
  }
  // 유저 data 생성(회원가입시)
  createUser(uid: string | null, userName: string) {
    return axios.put(
      `https://todolist-competition-default-rtdb.firebaseio.com/times/${uid}.json`,
      {
        userName: userName,
        time: 0,
      }
    );
  }
  // 시간 실시간으로 업데이트
  updateTime(uid: string | null, time: number) {
    firebaseDatabase.ref(`times/${uid}`).update({
      time: time,
    });
  }
  // 타이머 sync맞추기위해 리스너 등록
  timeSync(uid: string | null, update?: CallbackType) {
    const datasRef = firebaseDatabase.ref(`times/${uid}`);
    datasRef.on('value', (snapshot) => {
      update && update(snapshot.val().time);
    });

    return () => datasRef.off();
  }
  // 유저들의 닉네임 데이터 실시간으로 받아옴 sync맞춤
  getUserDatas(show?: CallbackType) {
    const datasRef = firebaseDatabase.ref('times');
    datasRef.on('value', (snapshot) => {
      show && show(snapshot.val());
    });

    return () => datasRef.off();
  }
  // 로그인한 자신 ,본인 별명 수정
  getLoginUserData(uid: string | null, get?: CallbackType) {
    const datasRef = firebaseDatabase.ref(`times`);
    datasRef.on('value', (snapshop) => {
      if (uid) {
        get && get(snapshop.val()[uid].userName);
      }
    });

    return () => datasRef;
  }
  // 사용자 별명 변경
  changeCharacterName(uid: string | null, newUserName: string) {
    return axios.patch(
      `https://todolist-competition-default-rtdb.firebaseio.com/times/${uid}.json`,
      { userName: newUserName }
    );
  }
  // 사용자 개인정보 삭제
  deleteUserInfo(uid: string | null) {
    return axios.delete(
      `https://todolist-competition-default-rtdb.firebaseio.com/times/${uid}.json`
    );
  }
  // 사용자 데이터삭제
  deleteUserData(uid: string | null) {
    return axios.delete(
      `https://todolist-competition-default-rtdb.firebaseio.com/users/${uid}.json`
    );
  }
}
