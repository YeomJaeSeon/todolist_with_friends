import styled from 'styled-components';
import { WhiteColor, BoxShadow } from '../../utils/css-utils';
import { ReactComponent as TrashSVG } from '../../assets/svg/trash-solid.svg';
import { ReactComponent as DragSVG } from '../../assets/svg/bars-solid.svg';

export const CardContainer = styled.form<{
  isDragging: boolean;
  isDropAnimating: boolean;
}>`
  position: relative;
  width: 245px;
  height: 230px;
  background-color: ${WhiteColor};
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
  box-shadow: ${BoxShadow};
  opacity: ${(props) => (props.isDragging ? '0.5' : '1')};
`;
export const CardDeleteBtn = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  &:hover {
    transform: scale(1.1);
  }
`;

export const MetaDataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const DragElement = styled.span``;

export const DragIcon = styled(DragSVG)`
  width: 20px;
  height: 20px;
`;

export const TrashIcon = styled(TrashSVG)`
  width: 20px;
  height: 20px;
`;

export const AddContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AddInput = styled.input.attrs({
  placeholder: '할일 입력해주세요.',
})`
  flex: 1;
  margin: 5px 0;
  padding: 3px 3px;
`;

export const AddBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
export const TodoContainer = styled.ul`
  flex: 1;
  overflow: auto;
  padding-left: 0;
  list-style: none;
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
