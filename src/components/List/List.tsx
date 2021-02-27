import React, { useState, useRef, useEffect } from 'react';
import Card from '../Card/Card';
import {
  ListContainer,
  Container,
  EditorContainer,
  ArrowIcon,
  EditorTitle,
  CardListContainer,
  CardAddBtn,
} from './List.style';
import { useDispatch } from 'react-redux';
import { addCardAction, StateType } from '../../modules/todos';
import { ReactComponent as LeftSVG } from '../../assets/svg/chevron-left-solid.svg';
import { ReactComponent as RightSVG } from '../../assets/svg/chevron-right-solid.svg';
import { Droppable } from 'react-beautiful-dnd';
import { DatabaseType } from 'src/services/data_service';

type PropType = {
  cards: StateType;
  uid: string | null;
  databaseService: DatabaseType;
};

const List: React.FC<PropType> = ({ cards, uid, databaseService }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [fold, setFold] = useState(true);
  const dispatch = useDispatch();

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  });

  const addCard = () => {
    const newId = Date.now();

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const today = `${year}-${month}-${day}`;

    dispatch(addCardAction(String(newId), today));
    databaseService.write(uid, String(newId), today);
  };
  const onFoldHandler = () => {
    setFold((fold) => !fold);
  };

  return (
    <ListContainer fold={fold}>
      <EditorTitle fold={fold}>Plan your todos</EditorTitle>
      <Container>
        <EditorContainer fold={fold}>
          <Droppable
            droppableId="cards"
            direction={width <= 576 ? 'horizontal' : 'vertical'}
          >
            {(provided, snapshot) => (
              <CardListContainer
                className="cards"
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {cards.map((card, index) => (
                  <Card
                    key={card.id}
                    cardId={card.id}
                    todos={card.todos}
                    current={card.current}
                    index={index}
                    uid={uid}
                    databaseService={databaseService}
                  />
                ))}
                {provided.placeholder}
              </CardListContainer>
            )}
          </Droppable>
          <CardAddBtn onClick={addCard}>➕</CardAddBtn>
        </EditorContainer>
        <ArrowIcon as={fold ? LeftSVG : RightSVG} onClick={onFoldHandler} />
      </Container>
    </ListContainer>
  );
};

export default List;
