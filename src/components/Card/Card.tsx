import React, { useRef, useEffect } from 'react';
import Calendar from '../Calender/Calender';
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
import { DatabaseType } from 'src/services/data_service';

type PropType = {
  cardId: string;
  todos: { id: number; thing: string }[];
  current: boolean;
  index: number;
  uid: string | null;
  databaseService: DatabaseType;
};

const Card: React.FC<PropType> = ({
  cardId,
  todos,
  current,
  index,
  uid,
  databaseService,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  // 카드 새로만들어질떄마다 해당 카드로 scroll
  useEffect(() => {
    buttonRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, []);

  // 카드삭제 상태와 데이터베이스모두적용
  const deleteCard = () => {
    databaseService.removeCard(uid, cardId);
    dispatch(deleteCardAction(cardId));
  };
  // 할일 추가 , 상태와 데이터베이스 모두 적용
  const addTodo = () => {
    if (inputRef.current?.value === '') return;
    const newId = Date.now();
    if (inputRef && inputRef.current) {
      dispatch(addTodoAction(cardId, newId, inputRef.current.value));
      databaseService.writeTodo(uid, cardId, newId, inputRef.current.value);
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
                <Calendar
                  uid={uid}
                  databaseService={databaseService}
                  cardId={cardId}
                />
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
                <AddBtn onClick={addTodo}>+</AddBtn>
              </AddContainer>
              <TodoContainer>
                {todos.map((item) => (
                  <Todo
                    key={item.id}
                    cardId={cardId}
                    todo={item}
                    uid={uid}
                    databaseService={databaseService}
                  />
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
