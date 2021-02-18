import React, { useState, useRef } from 'react';
import { TodoList, TodoText, TodoBtn } from './Todo.style';
import { useDispatch } from 'react-redux';
import { deleteTodoAction, updateTodoAction } from '../../modules/todos';
import { DatabaseType } from '../../services/data_service';

type PropType = {
  cardId: string;
  todo: {
    id: number;
    thing: string;
  };
  uid: string;
  databaseService: DatabaseType;
};

const Todo: React.FC<PropType> = ({ cardId, todo, uid, databaseService }) => {
  const dispatch = useDispatch();
  const [canEdit, setCanEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const clickEdit = () => {
    setCanEdit((edit) => !edit);
    inputRef.current && inputRef.current.focus();
  };

  const deleteTodo = () => {
    dispatch(deleteTodoAction(cardId, todo.id));
    databaseService.removeTodo(uid, cardId, todo.id);
  };

  const updateTodo = () => {
    if (inputRef && inputRef.current) {
      dispatch(updateTodoAction(cardId, todo.id, inputRef.current.value));
      databaseService.updateTodo(uid, cardId, todo.id, inputRef.current.value);
    }
  };

  return (
    <TodoList>
      <TodoText
        ref={inputRef}
        value={todo.thing}
        readOnly={canEdit ? false : true}
        edits={canEdit}
        onChange={updateTodo}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && canEdit) {
            clickEdit();
          }
        }}
      />
      <TodoBtn onClick={clickEdit}>{canEdit ? '✔' : 'Edit'}</TodoBtn>
      <TodoBtn onClick={deleteTodo}>Delete</TodoBtn>
    </TodoList>
  );
};

export default Todo;
