import styled from 'styled-components';
import { WhiteColor, BoxShadow, mobileQuery } from '../../utils/css-utils';

export const PlanTimerContainer = styled.div`
  position: relative;
  width: 550px;
  height: 220px;
  background-color: ${WhiteColor};
  text-align: center;
  font-size: 50px;
  border-radius: 15px;
  box-shadow: ${BoxShadow};
  ${mobileQuery} {
    width: 340px;
    height: 200px;
  }
`;

export const TimerTitleContainer = styled.div``;

export const TimerTitle = styled.h1`
  display: inline-block;
  margin: auto;
  font-size: 3rem;
  margin: 0;
  ${mobileQuery} {
    font-size: 2rem;
  }
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
  ${mobileQuery} {
    top: 30px;
    right: 40px;
  }
`;

export const MusicIcon = styled.div`
  width: 40px;
  height: 40px;
  ${mobileQuery} {
    width: 30px;
    height: 30px;
  }
`;

export const TimerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const TimeSection = styled.section`
  ${mobileQuery} {
    font-size: 2rem;
  }
`;

export const Btns = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const Icon = styled.div`
  width: 50px;
  height: 50px;
  ${mobileQuery} {
    width: 30px;
    height: 30px;
  }
`;
