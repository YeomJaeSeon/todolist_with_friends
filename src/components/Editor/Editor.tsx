import React, { useState } from 'react';
import Card from '../Card/Card';
import {
  ReactContainer,
  Container,
  EditorContainer,
  ArrowIcon,
  EditorTitle,
  CardListContainer,
  CardAddBtn,
} from './Editor.style';
import { useSelector, useDispatch } from 'react-redux';
import { RootType } from '../../modules/index';
import { addCardAction } from '../../modules/todos';
import { ReactComponent as LeftSVG } from '../../assets/svg/chevron-left-solid.svg';
import { ReactComponent as RightSVG } from '../../assets/svg/chevron-right-solid.svg';

const Editor: React.FC = () => {
  const [fold, setFold] = useState(true);
  const dispatch = useDispatch();
  const cards = useSelector((state: RootType) => state.todoReducer);
  const addCard = () => {
    const newId = Date.now();
    dispatch(addCardAction(newId));
  };
  const onFoldHandler = () => {
    setFold((fold) => !fold);
  };

  return (
    <ReactContainer>
      <EditorTitle fold={fold}>Plan your todos</EditorTitle>
      <Container>
        <EditorContainer fold={fold}>
          <CardListContainer>
            {Object.keys(cards).map((key) => (
              <Card key={key} cardId={key} todos={cards[key].todos} />
            ))}
            <CardAddBtn onClick={addCard}>➕</CardAddBtn>
          </CardListContainer>
        </EditorContainer>
        <ArrowIcon as={fold ? LeftSVG : RightSVG} onClick={onFoldHandler} />
      </Container>
    </ReactContainer>
  );
};

export default Editor;
