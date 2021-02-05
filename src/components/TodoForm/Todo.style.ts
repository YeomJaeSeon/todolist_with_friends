import styled from 'styled-components';

export const TodoList = styled.li`
  display: flex;
`;

type TextProp = {
  edits: boolean;
};

export const TodoText = styled.input<TextProp>`
  font-weight: ${({ edits }) => (edits ? 'normal' : 'bold')};
  border: none;
  outline: none;
  width: 70%;
  overflow-x: auto;
  background-color: transparent;
  cursor: ${({ edits }) => !edits && 'default'};
`;

export const TodoBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
