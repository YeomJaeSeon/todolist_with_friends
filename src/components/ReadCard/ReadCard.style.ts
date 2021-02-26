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
  margin-top: 15px;
  display: flex;
  align-items: center;
`;

export const ReadCardTitle = styled.span`
  padding-left: 13px;
`;

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

export const TodoContent = styled.span``;

export const ToggleBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const ReadCardList = styled.li<{ done: boolean }>`
  margin: 0 10px;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.done && 'gray'};
  ${TodoContent} {
    text-decoration: ${(props) => props.done && 'line-through'};
  }
  ${ToggleBtn} {
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
  margin: 0 20px;
`;

export const TrashIcon = styled(TrashSVG)`
  width: 20px;
  height: 20px;
`;
