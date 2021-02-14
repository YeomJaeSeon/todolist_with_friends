import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import * as S from './ReadCard.style';

type PropType = {
  currentId: string;
  today: string;
  todos: {
    id: number;
    thing: string;
  }[];
};

const ReadCard: React.FC<PropType> = ({ currentId, today, todos }) => {
  return (
    <Draggable key={currentId} draggableId={currentId} index={0}>
      {(provided, snapshot) => (
        <S.ReadCardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          <S.ReadCardHeader>
            <S.ReadCardTitle>{today}의 할일목록</S.ReadCardTitle>
            <S.DragElement {...provided.dragHandleProps}>
              <S.DragIcon />
            </S.DragElement>
          </S.ReadCardHeader>
          <S.ReadCardListContainer>
            {todos.map((todo) => (
              <S.ReadCardList key={todo.id}>{todo.thing}</S.ReadCardList>
            ))}
          </S.ReadCardListContainer>
        </S.ReadCardContainer>
      )}
    </Draggable>
  );
};

export default ReadCard;
