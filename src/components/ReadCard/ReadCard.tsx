import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import * as S from './ReadCard.style';
import { useDispatch } from 'react-redux';
import { toggleTodoAction, deleteCardAction } from '../../modules/todos';

type PropType = {
  currentId: string;
  today: string;
  todos: {
    id: number;
    thing: string;
    checked: boolean;
  }[];
};

const ReadCard: React.FC<PropType> = ({ currentId, today, todos }) => {
  const dispatch = useDispatch();

  const onToggleHandler = (id: number) => () => {
    dispatch(toggleTodoAction(currentId, id));
  };

  const deleteCardHandelr = () => {
    dispatch(deleteCardAction(currentId));
  };
  return (
    <Draggable key={currentId} draggableId={currentId} index={0}>
      {(provided, snapshot) => (
        <S.ReadCardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          <S.ReadCardHeader>
            <S.ReadCardTitle>{today} 할일 목록</S.ReadCardTitle>
            <S.CardDeleteBtn onClick={deleteCardHandelr}>
              <S.TrashIcon />
            </S.CardDeleteBtn>
            <S.DragElement {...provided.dragHandleProps}>
              <S.DragIcon />
            </S.DragElement>
          </S.ReadCardHeader>
          <S.ReadCardListContainer>
            {todos.map((todo) => (
              <S.ReadCardList done={todo.checked} key={todo.id}>
                <S.todoContent>{todo.thing}</S.todoContent>
                <S.toggleBtn onClick={onToggleHandler(todo.id)}>
                  {todo.checked ? 'uncheck' : 'check'}
                </S.toggleBtn>
              </S.ReadCardList>
            ))}
          </S.ReadCardListContainer>
        </S.ReadCardContainer>
      )}
    </Draggable>
  );
};

export default ReadCard;
