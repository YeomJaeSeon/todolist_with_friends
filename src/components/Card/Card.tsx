import React, { useState, useRef, useEffect } from 'react';
import Calendar, { RefType } from '../Calender/Calender';
import Todo from '../TodoForm/Todo';
import {
  CardContainer,
  CardDeleteBtn,
  TrashIcon,
  AddContainer,
  AddInput,
  AddBtn,
  TodoContainer,
} from './Card.style';

type StateType = {
  [key: string]: {
    id: number;
    thing: string;
  };
};

type PropType = {
  id: number;
  onDeleteCard(id: number): void;
};

const Card: React.FC<PropType> = ({ id, onDeleteCard }) => {
  const [todos, setTodos] = useState<StateType>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const calendarRef = useRef<RefType>(null);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const addTodo = () => {
    if (inputRef.current && inputRef.current.value) {
      const newTodo = inputRef.current.value;
      const newId = Date.now();
      setTodos((todos) => ({
        ...todos,
        [newId]: { id: newId, thing: newTodo },
      }));

      inputRef.current.value = '';
    }
  };

  const onDelete = (id: number) => {
    setTodos((todos) => {
      const newTodo = { ...todos };
      delete newTodo[id];
      return newTodo;
    });
  };

  const onUpdate = (id: number, value: string) => {
    setTodos((todos) => ({
      ...todos,
      [id]: { ...todos[id], thing: value },
    }));
  };

  const deleteCard = () => {
    onDeleteCard(id);
  };

  return (
    <CardContainer ref={divRef}>
      <Calendar ref={calendarRef} />
      <CardDeleteBtn onClick={deleteCard}>
        <TrashIcon />
      </CardDeleteBtn>
      <AddContainer>
        <AddInput ref={inputRef} type="text" />
        <AddBtn onClick={addTodo}>➕</AddBtn>
      </AddContainer>
      <TodoContainer>
        {Object.keys(todos).map((key) => (
          <Todo
            key={key}
            todo={todos[key]}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </TodoContainer>
    </CardContainer>
  );
};

export default Card;
