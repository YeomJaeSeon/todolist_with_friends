import React from 'react';
import { CurrentPlanContainer, DragText } from './CurrentPlan.style';
import { Droppable } from 'react-beautiful-dnd';
import ReadCard from '../ReadCard/ReadCard';

import { useSelector } from 'react-redux';
import { RootType } from '../../modules/index';
import { DatabaseType } from 'src/services/data_service';

type PropType = {
  uid: string | null;
  databaseService: DatabaseType;
};

const CurrentPlan: React.FC<PropType> = ({ uid, databaseService }) => {
  const currentCard = useSelector((state: RootType) => state.todoReducer).find(
    (card) => card.current === true
  );

  return (
    <Droppable droppableId="card">
      {(provided, snapshot) => (
        <CurrentPlanContainer
          className="card"
          {...provided.droppableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDraggingOver}
        >
          {currentCard ? (
            <ReadCard
              currentId={currentCard.id}
              today={currentCard.today}
              todos={currentCard.todos}
              uid={uid}
              databaseService={databaseService}
            />
          ) : (
            <DragText>Drag Please!!!</DragText>
          )}
          {provided.placeholder}
        </CurrentPlanContainer>
      )}
    </Droppable>
  );
};

export default CurrentPlan;
