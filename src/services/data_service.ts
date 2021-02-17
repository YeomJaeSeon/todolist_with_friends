import { firebaseDatabase } from './firebase';

type TodoType = {
  id: number;
  thing: string;
  checked: boolean;
};

type CardType = {
  id: string;
  current: boolean;
  today: string;
  todos: TodoType;
};

export type DatabaseType = {
  write(uid: string, id: string, today: string): void;
  remove(uid: string, id: string): void;
  dataSync(callback: () => void): void;
};

export default class Database {
  write(uid: string, id: string, today: string) {
    firebaseDatabase.ref('users/' + uid + '/' + id).set({
      id: id,
      current: false,
      today: today,
      todos: [],
    });
  }
  remove(uid: string, id: string) {
    firebaseDatabase.ref('users/' + uid + '/' + id).remove();
  }
  dataSync(callback: () => void) {
    const datasRef = firebaseDatabase.ref('users/');
    datasRef.on('value', callback);

    return datasRef.off();
  }
}
