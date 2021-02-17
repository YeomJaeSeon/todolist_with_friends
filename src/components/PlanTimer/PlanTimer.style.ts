import styled from 'styled-components';
import { WhiteColor, BoxShadow } from '../../utils/css-utils';

export const PlanTimerContainer = styled.div`
  width: 60%;
  height: 30%;
  background-color: ${WhiteColor};
  text-align: center;
  font-size: 50px;
  border-radius: 15px;
  box-shadow: ${BoxShadow};
`;

export const TimerTitleContainer = styled.span``;

export const TimerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
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
