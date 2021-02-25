import React, { useEffect, useState } from 'react';
import { DatabaseType } from 'src/services/data_service';
import CurrentPlan from '../CurrentPlan/CurrentPlan';
import PlanTimer from '../PlanTimer/PlanTimer';
import Ranking from '../Ranking/Ranking';
import {
  StartPlanContainer,
  TimerTitle,
  RankingContainer,
  EmptySection,
  AllSection,
} from './StartPlan.style';

type PropType = {
  uid: string | null;
  databaseService: DatabaseType;
  modalDisplay: boolean;
};
const StartPlan: React.FC<PropType> = ({
  uid,
  databaseService,
  modalDisplay,
}) => {
  return (
    <StartPlanContainer>
      <AllSection>
        <TimerTitle>Start Planning 🏃‍♀️🏃‍♂️</TimerTitle>
        <PlanTimer
          uid={uid}
          databaseService={databaseService}
          modalDisplay={modalDisplay}
        />
        <CurrentPlan uid={uid} databaseService={databaseService} />
      </AllSection>
      <RankingContainer>
        <EmptySection></EmptySection>
        <Ranking databaseService={databaseService}></Ranking>
      </RankingContainer>
    </StartPlanContainer>
  );
};

export default StartPlan;
