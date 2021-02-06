import React from 'react';
import Card from '../Card/Card';
import { EditorContainer, CardAddBtn } from './Editor.style';
import { useSelector, useDispatch } from 'react-redux';
import { RootType } from '../../modules/index';
import { addCardAction } from '../../modules/todos';

const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootType) => state.todoReducer);
  const addCard = () => {
    const newId = Date.now();
    dispatch(addCardAction(newId));
  };

  return (
    <EditorContainer>
      <h1>Plan your todos</h1>
      {Object.keys(cards).map((key) => (
        <Card key={key} cardId={key} todos={cards[key].todos} />
      ))}
      <CardAddBtn onClick={addCard}>➕</CardAddBtn>
    </EditorContainer>
  );
};

export default Editor;
