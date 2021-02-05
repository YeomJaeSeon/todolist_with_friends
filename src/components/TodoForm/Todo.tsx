import React, { useState, useRef } from 'react';
import { TodoList, TodoText, TodoBtn } from './Todo.style';

type PropType = {
  todo: {
    id: number;
    thing: string;
  };
  onDelete: (id: number) => void;
  onUpdate: (id: number, value: string) => void;
};

const Todo: React.FC<PropType> = ({ todo, onDelete, onUpdate }) => {
  const [canEdit, setCanEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const deleteHandler = () => {
    onDelete(todo.id);
  };

  const clickEdit = () => {
    setCanEdit((edit) => !edit);
    inputRef.current && inputRef.current.focus();
  };

  const upDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(todo.id, e.currentTarget.value);
  };

  return (
    <TodoList>
      <TodoText
        ref={inputRef}
        value={todo.thing}
        onChange={upDateHandler}
        readOnly={canEdit ? false : true}
        edits={canEdit}
      />
      <TodoBtn onClick={clickEdit}>{canEdit ? '✔' : 'Edit'}</TodoBtn>
      <TodoBtn onClick={deleteHandler}>Delete</TodoBtn>
    </TodoList>
  );
};

export default Todo;
