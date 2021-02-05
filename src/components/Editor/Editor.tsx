import React from 'react';
import Card from '../Card/Card';
import { EditorContainer, CardAddBtn } from './Editor.style';

type PropType = {
  cards: number[];
  addCard: (id: number) => void;
  onDeleteCard(selectedId: number): void;
};

let newId: number;

const Editor: React.FC<PropType> = ({ cards, addCard, onDeleteCard }) => {
  const addCardHandler = () => {
    newId = Date.now();
    addCard(newId);
  };
  return (
    <EditorContainer>
      <h1>Plan your todos</h1>
      {cards.map((id: number) => (
        <Card key={id} id={id} onDeleteCard={onDeleteCard} />
      ))}
      <CardAddBtn onClick={addCardHandler}>➕</CardAddBtn>
    </EditorContainer>
  );
};

export default Editor;
