import React, { useRef, useEffect } from 'react';
import Calendar, { RefType } from '../Calender/Calender';
import Todo from '../TodoForm/Todo';
import {
  CardContainer,
  CardDeleteBtn,
  MetaDataContainer,
  DragElement,
  DragIcon,
  TrashIcon,
  AddContainer,
  AddInput,
  AddBtn,
  TodoContainer,
} from './Card.style';
import { useDispatch } from 'react-redux';
import { deleteCardAction, addTodoAction } from '../../modules/todos';
import { Draggable } from 'react-beautiful-dnd';

type PropType = {
  cardId: string;
  todos: { id: number; thing: string }[];
  current: boolean;
  index: number;
};

const Card: React.FC<PropType> = ({ cardId, todos, current, index }) => {
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
    <>
      {!current ? (
        <Draggable key={cardId} draggableId={cardId} index={index}>
          {(provided, snapshot) => (
            <CardContainer
              {...provided.draggableProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              isDropAnimating={snapshot.isDropAnimating}
              onSubmit={(e) => e.preventDefault()}
            >
              <MetaDataContainer>
                <Calendar cardId={cardId} ref={calendarRef} />
                <CardDeleteBtn
                  ref={buttonRef}
                  type="button"
                  onClick={deleteCard}
                >
                  <TrashIcon />
                </CardDeleteBtn>
                <DragElement {...provided.dragHandleProps}>
                  <DragIcon />
                </DragElement>
              </MetaDataContainer>
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
          )}
        </Draggable>
      ) : (
        <div style={{ width: '10px', height: '10px' }}></div>
      )}
    </>
  );
};

export default Card;
