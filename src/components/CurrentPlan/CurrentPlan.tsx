import React from 'react';
import { CurrentPlanContainer } from './CurrentPlan.style';
import { Droppable } from 'react-beautiful-dnd';
import ReadCard from '../ReadCard/ReadCard';

import { useSelector } from 'react-redux';
import { RootType } from '../../modules/index';

const CurrentPlan: React.FC = () => {
  const currentCard = useSelector((state: RootType) => state.todoReducer).find(
    (card) => card.current === true
  );

  return (
    <Droppable droppableId="card">
      {(provided) => (
        <CurrentPlanContainer
          className="card"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {currentCard ? (
            <ReadCard currentId={currentCard.id} todos={currentCard.todos} />
          ) : (
            'Drag Please'
          )}
          {provided.placeholder}
        </CurrentPlanContainer>
      )}
    </Droppable>
  );
};

export default CurrentPlan;
