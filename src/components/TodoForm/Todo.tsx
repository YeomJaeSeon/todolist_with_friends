import React from 'react';
import { TodoList, TodoText } from './Todo.style';

type PropType = {
  todo: {
    id: number;
    thing: string;
    check: boolean;
  };
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
};

const Todo: React.FC<PropType> = ({ todo, onCheck, onDelete }) => {
  const checkHandler = () => {
    onCheck(todo.id);
  };
  const deleteHandler = () => {
    onDelete(todo.id);
  };

  return (
    <TodoList>
      <TodoText check={todo.check}>{todo.thing}</TodoText>
      <button onClick={checkHandler}>Edit</button>
      <button onClick={deleteHandler}>Delete</button>
    </TodoList>
  );
};

export default Todo;
