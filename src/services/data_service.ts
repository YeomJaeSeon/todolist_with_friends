import { firebaseDatabase } from './firebase';

type CallbackType = (value: any) => void;

export type DatabaseType = {
  write(uid: string | null, id: string, today: string): void;
  writeTodo(uid: string | null, id: string, todoId: number, todo: string): void;
  remove(uid: string | null, id: string): void;
  removeTodo(uid: string | null, id: string, todoId: number): void;
  updateTodo(
    uid: string | null,
    id: string,
    todoId: number,
    updateTodo: string
  ): void;
  toggleTodo(
    uid: string | null,
    id: string,
    todoId: number,
    checked: boolean
  ): void;
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
  deleteUser(uid: string | null): void;
};

export default class Database {
  write(uid: string | null, id: string, today: string) {
    firebaseDatabase.ref(`users/${uid}/${id}`).set({
      id: id,
      current: false,
      today: today,
      todos: '',
    });
  }

  writeTodo(uid: string | null, id: string, todoId: number, todo: string) {
    firebaseDatabase.ref(`users/${uid}/${id}/todos/${todoId}`).set({
      id: todoId,
      thing: todo,
      checked: false,
    });
  }

  remove(uid: string | null, id: string) {
    firebaseDatabase.ref(`users/${uid}/${id}`).remove();
  }

  removeTodo(uid: string | null, id: string, todoId: number) {
    firebaseDatabase.ref(`users/${uid}/${id}/todos/${todoId}`).remove();
  }

  updateTodo(
    uid: string | null,
    id: string,
    todoId: number,
    updateTodo: string
  ) {
    firebaseDatabase.ref(`users/${uid}/${id}/todos/${todoId}`).update({
      thing: updateTodo,
    });
  }

  toggleTodo(uid: string | null, id: string, todoId: number, checked: boolean) {
    firebaseDatabase.ref(`users/${uid}/${id}/todos/${todoId}`).update({
      checked: checked,
    });
  }

  updateCalendar(uid: string | null, id: string, today: string) {
    firebaseDatabase.ref(`users/${uid}/${id}`).update({
      today: today,
    });
  }

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

  dataSync(uid: string | null, update?: CallbackType) {
    const datasRef = firebaseDatabase.ref(`users/${uid}`);
    datasRef.once('value', (snapshot) => {
      update && update(snapshot.val());
    });
  }

  createUser(uid: string | null, userName: string) {
    firebaseDatabase.ref(`times/${uid}`).set({
      userName: userName,
      time: 0,
    });
  }

  updateTime(uid: string | null, time: number) {
    firebaseDatabase.ref(`times/${uid}`).update({
      time: time,
    });
  }
  timeSync(uid: string | null, update?: CallbackType) {
    const datasRef = firebaseDatabase.ref(`times/${uid}`);
    datasRef.on('value', (snapshot) => {
      update && update(snapshot.val().time);
    });

    return () => datasRef.off();
  }
  getUserDatas(show?: CallbackType) {
    const datasRef = firebaseDatabase.ref('times');
    datasRef.on('value', (snapshot) => {
      show && show(snapshot.val());
    });

    return () => datasRef.off();
  }
  getLoginUserData(uid: string | null, get?: CallbackType) {
    const datasRef = firebaseDatabase.ref(`times`);
    datasRef.on('value', (snapshop) => {
      if (uid) {
        get && get(snapshop.val()[uid].userName);
      }
    });

    return () => datasRef;
  }

  changeCharacterName(uid: string | null, newUserName: string) {
    firebaseDatabase.ref(`times/${uid}`).update({
      userName: newUserName,
    });
  }
  deleteUser(uid: string | null) {
    firebaseDatabase.ref(`times/${uid}`).remove();
    firebaseDatabase.ref(`users/${uid}`).remove();
  }
}
