import styled from 'styled-components';
import { WhiteColor, BoxShadow } from '../../utils/css-utils';

export const PlanTimerContainer = styled.div`
  position: relative;
  width: 60%;
  height: 30%;
  background-color: ${WhiteColor};
  text-align: center;
  font-size: 50px;
  border-radius: 15px;
  box-shadow: ${BoxShadow};
`;

export const TimerTitleContainer = styled.span``;

export const TimerTitle = styled.h1`
  display: inline-block;
  margin: auto;
  font-size: 3rem;
  margin: 0;
`;

export const MusicBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 60px;
  background-color: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  margin-left: 30px;
`;

export const MusicIcon = styled.div`
  width: 40px;
  height: 40px;
`;

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
