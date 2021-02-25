import styled from 'styled-components';
import { WhiteColor, BoxShadow } from '../../utils/css-utils';
import { ReactComponent as DragSVG } from '../../assets/svg/bars-solid.svg';
import { ReactComponent as TrashSVG } from '../../assets/svg/trash-solid.svg';

export const ReadCardContainer = styled.div<{ isDragging: boolean }>`
  background-color: ${WhiteColor};
  height: 100%;
  opacity: ${(props) => (props.isDragging ? '0.5' : '1')};
  border-radius: 10px;
  box-shadow: ${BoxShadow};
  display: flex;
  flex-direction: column;
`;

export const ReadCardHeader = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const ReadCardTitle = styled.span``;

export const ReadCardListContainer = styled.ul`
  list-style: none;
  padding-left: 0;
  overflow: auto;
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
`;

export const todoContent = styled.span``;

export const toggleBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const ReadCardList = styled.li<{ done: boolean }>`
  margin: 0 10px;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.done && 'gray'};
  ${todoContent} {
    text-decoration: ${(props) => props.done && 'line-through'};
  }
  ${toggleBtn} {
    color: ${(props) => props.done && 'gray'};
  }
`;

export const DragElement = styled.span``;

export const DragIcon = styled(DragSVG)`
  width: 20px;
  height: 20px;
`;

export const CardDeleteBtn = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  &:hover {
    transform: scale(1.1);
  }
`;

export const TrashIcon = styled(TrashSVG)`
  width: 20px;
  height: 20px;
`;
