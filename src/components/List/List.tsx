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
import { addCardAction } from '../../modules/todos';
import { ReactComponent as LeftSVG } from '../../assets/svg/chevron-left-solid.svg';
import { ReactComponent as RightSVG } from '../../assets/svg/chevron-right-solid.svg';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const List: React.FC = () => {
  const [fold, setFold] = useState(true);
  const dispatch = useDispatch();
  const cards = useSelector((state: RootType) => state.todoReducer);
  console.log(cards);
  const addCard = () => {
    const newId = Date.now();
    dispatch(addCardAction(String(newId)));
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
            {(provided) => (
              <CardListContainer
                className="cards"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => {
                      return (
                        <Card
                          innerRef={provided.innerRef}
                          dragHandle={provided.dragHandleProps}
                          dragProp={provided.draggableProps}
                          cardId={card.id}
                          todos={card.todos}
                        />
                      );
                    }}
                  </Draggable>
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
