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
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

type PropType = {
  cardId: string;
  todos: { id: number; thing: string }[];
  innerRef: (element?: HTMLElement | null | undefined) => any;
  dragHandle?: DraggableProvidedDragHandleProps;
  dragProp: DraggableProvidedDraggableProps;
};

const Card: React.FC<PropType> = ({
  cardId,
  todos,
  innerRef,
  dragHandle,
  dragProp,
}) => {
  console.log('나님 생성');
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<RefType>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    buttonRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    <CardContainer
      ref={innerRef}
      {...dragHandle}
      {...dragProp}
      onSubmit={(e) => e.preventDefault()}
    >
      <Calendar ref={calendarRef} />
      <CardDeleteBtn ref={buttonRef} type="button" onClick={deleteCard}>
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
