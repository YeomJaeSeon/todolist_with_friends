import styled, { keyframes } from 'styled-components';
import { MainBackgroundColor, NotiColor } from '../../utils/css-utils';

export const MainContainer = styled.div`
  flex-basis: 100%;
  height: 100%;
  display: flex;
`;

export const PendingBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${MainBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  0%{
    tranform : rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 10px solid gray;
  border-top: 10px solid ${NotiColor};
  animation: ${spin} 2s infinite linear;
`;
