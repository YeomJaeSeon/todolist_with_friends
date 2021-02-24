import React from 'react';
import { DatabaseType } from 'src/services/data_service';
import CurrentPlan from '../CurrentPlan/CurrentPlan';
import PlanTimer from '../PlanTimer/PlanTimer';
import { StartPlanContainer, TimerTitle, LogoutBtn } from './StartPlan.style';

type PropType = {
  logout: () => void;
  uid: string;
  databaseService: DatabaseType;
};
const StartPlan: React.FC<PropType> = ({ logout, uid, databaseService }) => {
  return (
    <StartPlanContainer>
      <TimerTitle>Start Planning 🏃‍♀️🏃‍♂️</TimerTitle>
      <LogoutBtn onClick={logout}>Logout</LogoutBtn>
      <PlanTimer uid={uid} databaseService={databaseService} />
      <CurrentPlan uid={uid} databaseService={databaseService} />
    </StartPlanContainer>
  );
};

export default StartPlan;
