import React from 'react';
import Card from '../Card/Card';
import { EditorContainer } from './Editor.style';

const Editor = () => {
  return (
    <EditorContainer>
      <h1>Plan your todos</h1>
      <Card />
    </EditorContainer>
  );
};

export default Editor;
