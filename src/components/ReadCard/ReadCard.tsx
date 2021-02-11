import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import * as S from './ReadCard.style';

type PropType = {
  currentId: string;
  todos: {
    id: number;
    thing: string;
  }[];
};

const ReadCard: React.FC<PropType> = ({ currentId, todos }) => {
  return (
    <Draggable key={currentId} draggableId={currentId} index={0}>
      {(provided) => (
        <S.ReadCardContainer
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <span>2020.3.2</span>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.thing}</li>
            ))}
          </ul>
        </S.ReadCardContainer>
      )}
    </Draggable>
  );
};

export default ReadCard;
