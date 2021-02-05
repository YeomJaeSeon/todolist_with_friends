import styled from 'styled-components';
import { MainBackgroundColor } from '../../utils/css-utils';

export const EditorContainer = styled.ul`
  width: 300px;
  background-color: ${MainBackgroundColor};
  margin: 0;
  padding-left: 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  white-space: nowrap;
`;

export const CardAddBtn = styled.button`
  font-size: 30px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 20px 0;
  &:hover {
    transform: scale(1.1);
  }
`;
