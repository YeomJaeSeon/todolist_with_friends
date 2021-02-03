import React, { useState, useRef } from 'react';
import Todo from '../TodoForm/Todo';
import { InputCardContainer, TodoListContainer } from './InputTodo.style';

type ObjectType = {
  [key: string]: {
    id: number;
    thing: string;
  };
};

const InputTodoCard: React.FC = () => {
  const [todos, setTodos] = useState<ObjectType>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const newTodo = inputRef.current.value;
      const newId = Date.now();
      setTodos((todos) => ({
        ...todos,
        [newId]: { id: newId, thing: newTodo },
      }));

      inputRef.current.value = '';
    }
  };
  return (
    <InputCardContainer onSubmit={addTodo}>
      <label>
        <input type="date" />
      </label>
      <input ref={inputRef} type="text" />
      <button>➕</button>
      <TodoListContainer>
        {Object.keys(todos).map((key) => (
          <Todo key={key} todo={todos[key]} />
        ))}
      </TodoListContainer>
    </InputCardContainer>
  );
};

export default InputTodoCard;
