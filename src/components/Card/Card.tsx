import React, { useRef, useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import { deleteCardAction, addTodoAction } from '../../modules/todos';

type PropType = {
  cardId: string;
  todos: { id: number; thing: string }[];
};

const Card: React.FC<PropType> = ({ cardId, todos }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<RefType>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const deleteCard = () => {
    dispatch(deleteCardAction(cardId));
  };
  const addTodo = () => {
    if (inputRef.current?.value === '') return;
    const newId = Date.now();
    if (inputRef && inputRef.current) {
      dispatch(addTodoAction(cardId, newId, inputRef.current.value));
      inputRef.current.value = '';
    }
  };

  return (
    <CardContainer ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <Calendar ref={calendarRef} />
      <CardDeleteBtn type="button" onClick={deleteCard}>
        <TrashIcon />
      </CardDeleteBtn>
      <AddContainer>
        <AddInput ref={inputRef} type="text" />
        <AddBtn onClick={addTodo}>➕</AddBtn>
      </AddContainer>
      <TodoContainer>
        {todos.map((item) => (
          <Todo key={item.id} cardId={cardId} todo={item} />
        ))}
      </TodoContainer>
    </CardContainer>
  );
};

export default Card;
