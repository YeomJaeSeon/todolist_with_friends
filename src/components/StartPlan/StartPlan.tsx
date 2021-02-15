import React from 'react';
import CurrentPlan from '../CurrentPlan/CurrentPlan';
import PlanTimer from '../PlanTimer/PlanTimer';
import { StartPlanContainer, TimerTitle, LogoutBtn } from './StartPlan.style';

type PropType = {
  logout: () => void;
};
const StartPlan: React.FC<PropType> = ({ logout }) => {
  return (
    <StartPlanContainer>
      <TimerTitle>Start Planning 🏃‍♀️🏃‍♂️</TimerTitle>
      <LogoutBtn onClick={logout}>Logout</LogoutBtn>
      <PlanTimer />
      <CurrentPlan />
    </StartPlanContainer>
  );
};

export default StartPlan;
