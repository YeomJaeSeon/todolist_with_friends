import React, { useState, useEffect, useCallback } from 'react';
import Card from '../Card/Card';
import {
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

import { debounce } from 'lodash';

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
    setFold(true);
  };

  // 반응형을 위해서 resize 리스너 등록.
  useEffect(() => {
    window.addEventListener('resize', updateWidth);

    // 리스너 해제
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // 카드 추가할때 debounce적용, 어뷰징막으려고
  const addCard = debounce(() => {
    const newId = Date.now();

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const today = `${year}-${month}-${day}`;

    dispatch(addCardAction(String(newId), today));
    databaseService.writeCard(uid, String(newId), today);
  }, 50);

  const onFoldHandler = () => {
    setFold((fold) => !fold);
  };

  const svg = useCallback((fold: boolean) => {
    return fold ? LeftSVG : RightSVG;
  }, []);

  return (
    <Container fold={fold}>
      <EditorContainer fold={fold}>
        <EditorTitle fold={fold}>Plan your todos</EditorTitle>
        <Droppable
          droppableId="cards"
          direction={width <= 800 ? 'horizontal' : 'vertical'}
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
        <CardAddBtn onClick={addCard}>+</CardAddBtn>
      </EditorContainer>
      {width > 800 && <ArrowIcon as={svg(fold)} onClick={onFoldHandler} />}
    </Container>
  );
};

export default List;
