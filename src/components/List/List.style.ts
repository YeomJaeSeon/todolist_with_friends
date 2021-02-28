import { mobileQuery } from 'src/utils/css-utils';
import styled from 'styled-components';

export const ListContainer = styled.div<{ fold: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  ${mobileQuery} {
    width: 100%;
    overflow-y: visible;
    flex: 1 1 30%;
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  padding-bottom: 20px;
  ${mobileQuery} {
    overflow-x: auto;
    height: 332px;
  }
`;
export const EditorTitle = styled.h1<{ fold: boolean }>`
  display: ${(props) => (props.fold ? 'inline' : 'none')};
  text-align: center;
  ${mobileQuery} {
    margin-top: 60px;
  }
`;

export const CardListContainer = styled.ul<{ isDraggingOver: boolean }>`
  padding-left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobileQuery} {
    flex-direction: row;
  }
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
  ${CardAddBtn} {
    display: ${(props) => (props.fold ? 'flex' : 'none')};
  }
  ${mobileQuery} {
    flex-direction: row;
  }
`;
export const ArrowIcon = styled.svg`
  position: sticky;
  top: 45%;
  width: 20px;
  height: 40px;
  cursor: pointer;
  padding: 0 10px;
  ${mobileQuery} {
    display: none;
  }
`;
