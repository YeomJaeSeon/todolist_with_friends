import styled, { keyframes } from 'styled-components';
import { BoxShadow } from '../../utils/css-utils';

export const CurrentPlanContainer = styled.div<{ isDragging: boolean }>`
  opacity: ${(props) => (props.isDragging ? '0.5' : '1')};
  margin-top: 60px;
  width: 265px;
  height: 250px;
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
  box-shadow: ${BoxShadow};
`;

const spakle = keyframes`
  0% {
    opacity: 0.1;
  }
  100%{
    opacity: 1;
  }
`;

export const DragText = styled.span`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  animation: ${spakle} infinite 3s linear;
`;
