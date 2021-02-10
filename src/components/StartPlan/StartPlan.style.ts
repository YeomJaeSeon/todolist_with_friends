import styled from 'styled-components';
import { MainBackgroundColor } from '../../utils/css-utils';

export const StartPlanContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${MainBackgroundColor};
`;

export const TimerTitle = styled.h1``;

export const LogoutBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
