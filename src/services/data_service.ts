import { firebaseDatabase } from './firebase';
import { StateType } from '../modules/todos';

// type TodoType = {
//   id: number;
//   thing: string;
//   checked: boolean;
// }[];

// type CardType = {
//   id: string;
//   current: boolean;
//   today: string;
//   todos: TodoType;
// };

type CallbackType = (value: any) => void;

// export type SnapshotType = {

// }

export type DatabaseType = {
  write(uid: string, id: string, today: string): void;
  writeTodo(uid: string, id: string, todoId: number, todo: string): void;
  remove(uid: string, id: string): void;
  removeTodo(uid: string, id: string, todoId: number): void;
  updateTodo(uid: string, id: string, todoId: number, updateTodo: string): void;
  toggleTodo(uid: string, id: string, todoId: number, checked: boolean): void;
  updateCalendar(uid: string, id: string, today: string): void;
  changeToStart(
    uid: string,
    id: string,
    current: boolean,
    prevCardId?: string
  ): void;
  dataSync(uid: string, update: CallbackType): any;
  createUser(uid: string, userName: string): void;
  updateTime(uid: string, time: number): void;
  timeSync(uid: string, update: CallbackType): any;
};

export default class Database {
  write(uid: string, id: string, today: string) {
    firebaseDatabase.ref(`users/${uid}/${id}`).set({
      id: id,
      current: false,
      today: today,
      todos: '',
    });
  }

  writeTodo(uid: string, id: string, todoId: number, todo: string) {
    firebaseDatabase.ref(`users/${uid}/${id}/todos/${todoId}`).set({
      id: todoId,
      thing: todo,
      checked: false,
    });
  }

  remove(uid: string, id: string) {
    firebaseDatabase.ref(`users/${uid}/${id}`).remove();
  }

  removeTodo(uid: string, id: string, todoId: number) {
    firebaseDatabase.ref(`users/${uid}/${id}/todos/${todoId}`).remove();
  }

  updateTodo(uid: string, id: string, todoId: number, updateTodo: string) {
    firebaseDatabase.ref(`users/${uid}/${id}/todos/${todoId}`).update({
      thing: updateTodo,
    });
  }

  toggleTodo(uid: string, id: string, todoId: number, checked: boolean) {
    firebaseDatabase.ref(`users/${uid}/${id}/todos/${todoId}`).update({
      checked: checked,
    });
  }

  updateCalendar(uid: string, id: string, today: string) {
    firebaseDatabase.ref(`users/${uid}/${id}`).update({
      today: today,
    });
  }

  changeToStart(
    uid: string,
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

  dataSync(uid: string, update: CallbackType) {
    const datasRef = firebaseDatabase.ref(`users/${uid}`);
    datasRef.on('value', (snapshot) => {
      const value = snapshot.val();
      update(value);
    });

    return () => datasRef.off();
  }

  createUser(uid: string, userName: string) {
    firebaseDatabase.ref(`times/${uid}`).set({
      userName: userName,
      time: 0,
    });
  }
  updateTime(uid: string, time: number) {
    firebaseDatabase.ref(`times/${uid}`).update({
      time: time,
    });
  }
  timeSync(uid: string, update: CallbackType) {
    const datasRef = firebaseDatabase.ref(`times/${uid}`);
    datasRef.on('value', (snapshot) => {
      const time = snapshot.val().time;
      update(time);
    });

    return () => datasRef.off();
  }
}
