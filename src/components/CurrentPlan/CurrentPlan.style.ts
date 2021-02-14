import styled, { keyframes } from 'styled-components';

export const CurrentPlanContainer = styled.div<{ isDragging: boolean }>`
  opacity: ${(props) => (props.isDragging ? '0.5' : '1')};
  margin-top: 60px;
  width: 60%;
  height: 30%;
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
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
