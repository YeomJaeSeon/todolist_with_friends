import React, { useState, useRef } from 'react';
import Todo from '../TodoForm/Todo';
import { CardContainer, TodoInput, TodoContainer } from './Card.style';

type ObjectType = {
  [key: string]: {
    id: number;
    thing: string;
    check: boolean;
  };
};

const Card: React.FC = () => {
  const [todos, setTodos] = useState<ObjectType>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (inputRef.current && inputRef.current.value) {
      const newTodo = inputRef.current.value;
      const newId = Date.now();
      setTodos((todos) => ({
        ...todos,
        [newId]: { id: newId, thing: newTodo, check: false },
      }));

      inputRef.current.value = '';
    }
  };

  const onCheck = (id: number) => {
    setTodos((todos) => ({
      ...todos,
      [id]: { ...todos[id], check: !todos[id].check },
    }));
  };
  const onDelete = (id: number) => {
    setTodos((todos) => {
      const newTodo = { ...todos };
      delete newTodo[id];
      return newTodo;
    });
  };

  return (
    <CardContainer
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TodoInput ref={inputRef} type="text" />
      <button onClick={addTodo}>➕</button>
      <TodoContainer>
        {Object.keys(todos).map((key) => (
          <Todo
            key={key}
            todo={todos[key]}
            onCheck={onCheck}
            onDelete={onDelete}
          />
        ))}
      </TodoContainer>
    </CardContainer>
  );
};

export default Card;
