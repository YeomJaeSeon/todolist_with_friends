import styled from 'styled-components';
import { WhiteColor } from '../../utils/css-utils';
import { ReactComponent as TrashSVG } from '../../assets/svg/trash-solid.svg';

export const CardContainer = styled.div`
  position: relative;
  width: 245px;
  height: 230px;
  background-color: ${WhiteColor};
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
`;
export const CardDeleteBtn = styled.button`
  position: absolute;
  right: 15px;
  top: 12px;
  background-color: transparent;
  cursor: pointer;
  border: none;
  &:hover {
    transform: scale(1.1);
  }
`;

export const TrashIcon = styled(TrashSVG)`
  width: 15px;
  height: 15px;
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
`;
