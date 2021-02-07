import styled from 'styled-components';
import { WhiteColor, BoxShadow } from '../../utils/css-utils';

export const PlanTimerContainer = styled.div`
  width: 60%;
  height: 30%;
  background-color: ${WhiteColor};
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 50px;
  border-radius: 15px;
  box-shadow: ${BoxShadow};
`;

export const TimeSection = styled.section``;

export const Btns = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const Icon = styled.div`
  width: 50px;
  height: 50px;
`;
