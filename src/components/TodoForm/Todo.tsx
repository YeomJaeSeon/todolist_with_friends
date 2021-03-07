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
  uid: string | null;
  databaseService: DatabaseType;
};

const Todo: React.FC<PropType> = ({ cardId, todo, uid, databaseService }) => {
  const dispatch = useDispatch();
  const [canEdit, setCanEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // edit클릭하면 edit할수있는 상태로 변경
  const clickEdit = () => {
    setCanEdit((edit) => !edit);
    inputRef.current && inputRef.current.focus();
  };

  // todo삭제시 상태와 db변경
  const deleteTodo = () => {
    dispatch(deleteTodoAction(cardId, todo.id));
    databaseService.removeTodo(uid, cardId, todo.id);
  };

  // todo 업데이트 되면 업데이트된 todo를 상태와 데이터베이스에변경
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
