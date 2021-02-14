import styled from 'styled-components';
import { WhiteColor, BoxShadow } from '../../utils/css-utils';
import { ReactComponent as DragSVG } from '../../assets/svg/bars-solid.svg';

export const ReadCardContainer = styled.div<{ isDragging: boolean }>`
  width: ${(props) => (props.isDragging ? '245px' : '100%')};
  height: ${(props) => (props.isDragging ? '230px' : '100%')};
  opacity: ${(props) => (props.isDragging ? '0.5' : '1')};
  border-radius: 10px;
  box-shadow: ${BoxShadow};
  background-color: ${WhiteColor};
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const ReadCardHeader = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const ReadCardTitle = styled.span``;

export const ReadCardListContainer = styled.ul`
  list-style: none;
  padding-left: 0;
`;

export const ReadCardList = styled.li``;

export const DragElement = styled.span`
  margin-left: 15%;
`;

export const DragIcon = styled(DragSVG)`
  width: 20px;
  height: 20px;
`;
