import { mobileQuery, MainBackgroundColor } from 'src/utils/css-utils';
import styled from 'styled-components';

export const Container = styled.div<{ fold: boolean }>`
  width: ${(props) => (props.fold ? '340px' : '40px')};
  display: flex;
  background-color: ${MainBackgroundColor};
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
    overflow-x: auto;
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
    padding-left: 30px;
  }
`;
export const EditorTitle = styled.h1<{ fold: boolean }>`
  padding-top: 100px;
  margin: 0;
  margin-bottom: 30px;
  font-size: 1.8rem;
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
  font-size: 80px;
  background-color: transparent;
  border: none;
  outline: none;
  margin-bottom: 50px;
  cursor: pointer;
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
  ${mobileQuery} {
    width: 100vw;
    height: ${(props) => (props.fold ? '332px' : '150px')};
    transition: height 100ms ease;
  }
`;
export const ArrowIcon = styled.div`
  position: sticky;
  top: 50%;
  right: 0;
  width: 20px;
  height: 40px;
  cursor: pointer;
  padding: 0 10px;
`;
