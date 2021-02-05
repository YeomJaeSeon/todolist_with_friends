import React from 'react';
import CurrentPlan from '../CurrentPlan/CurrentPlan';
import PlanTimer from '../PlanTimer/PlanTimer';
import { TimerContainer, TimerTitle, LogoutBtn } from './Timer.style';

type PropType = {
  logout: () => void;
};
const Timer: React.FC<PropType> = ({ logout }) => {
  return (
    <TimerContainer>
      <TimerTitle>Start Planning</TimerTitle>
      <LogoutBtn onClick={logout}>Logout</LogoutBtn>
      <PlanTimer />
      <CurrentPlan />
    </TimerContainer>
  );
};

export default Timer;
