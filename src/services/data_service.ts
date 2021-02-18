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

export type DatabaseType = {
  write(uid: string, id: string, today: string): void;
  writeTodo(uid: string, id: string, todoId: number, todo: string): void;
  remove(uid: string, id: string): void;
  removeTodo(uid: string, id: string, todoId: number): void;
  updateTodo(uid: string, id: string, todoId: number, updateTodo: string): void;
  toggleTodo(uid: string, id: string, todoId: number, checked: boolean): void;
  updateCalendar(uid: string, id: string, today: string): void;
  changeCardSameId(uid: string, newCards: StateType): void;
  dataSync(callback: () => void): void;
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

  changeCardSameId(uid: string, newCards: StateType) {
    console.log('변경된 데이터dkdkdkdk');
    console.log(newCards);
    firebaseDatabase.ref(`users/${uid}`).remove();

    newCards.forEach((card) =>
      firebaseDatabase.ref(`users/${uid}/${card.id}`).update({
        id: card.id,
        current: card.current,
        today: card.today,
        todos: '',
      })
    );
    // newCards.forEach((card, idx) => {
    //   firebaseDatabase.ref(`users/${uid}/${card.id}`).set({
    //     index: idx,
    //     current: card.current,
    //     id: card.id,
    //     today: card.today,
    //     todos: '',
    //   });
    //   // firebaseDatabase.ref(`users/`).orderByChild(uid);
    //   // card.todos.forEach((todo) => {
    //   //   firebaseDatabase.ref(`users/${uid}/${card.id}/todos/${todo.id}`).set({
    //   //     id: todo.id,
    //   //     thing: todo.thing,
    //   //     checked: todo.checked,
    //   //   });
    //   // });
    // });

    // 카드 옮기면 fb에도 적용되야할텐데. .어떤식으로할까
  }
  dataSync(callback: () => void) {
    const datasRef = firebaseDatabase.ref('users/');
    datasRef.on('value', callback);

    // return datasRef.off();
  }
}
