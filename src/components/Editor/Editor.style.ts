import styled from 'styled-components';
import { MainBackgroundColor } from '../../utils/css-utils';

export const ReactContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #c8e6c9;
  overflow: auto;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
`;
export const EditorTitle = styled.h1<{ fold: boolean }>`
  display: ${(props) => (props.fold ? 'inline' : 'none')};
  text-align: center;
`;

export const CardListContainer = styled.ul`
  padding-left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EditorContainer = styled.div<{ fold: boolean }>`
  width: ${(props) => (props.fold ? '300px' : '0')};
  margin: 0;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 100ms ease;
  ${CardListContainer} {
    display: ${(props) => (props.fold ? 'flex' : 'none')};
  }
`;
export const ArrowIcon = styled.svg`
  position: sticky;
  top: 45%;
  width: 20px;
  height: 40px;
  cursor: pointer;
  padding: 0 10px;
`;

export const CardAddBtn = styled.button`
  font-size: 30px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0 0 20px 0;
  &:hover {
    transform: scale(1.1);
  }
`;
