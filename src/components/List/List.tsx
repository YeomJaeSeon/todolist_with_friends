import React, { useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { RootType } from '../../modules/index';
import { addCardAction, StateType } from '../../modules/todos';
import { ReactComponent as LeftSVG } from '../../assets/svg/chevron-left-solid.svg';
import { ReactComponent as RightSVG } from '../../assets/svg/chevron-right-solid.svg';
import { Droppable } from 'react-beautiful-dnd';
import { DatabaseType } from 'src/services/data_service';

type PropType = {
  cards: StateType;
  uid: string;
  databaseService: DatabaseType;
};

const List: React.FC<PropType> = ({ cards, uid, databaseService }) => {
  const [fold, setFold] = useState(true);
  const dispatch = useDispatch();
  // const cards = useSelector((state: RootType) => state.todoReducer);
  console.log(cards);
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
    <ListContainer>
      <EditorTitle fold={fold}>Plan your todos</EditorTitle>
      <Container>
        <EditorContainer fold={fold}>
          <Droppable droppableId="cards">
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
