import React, { useEffect, useState } from 'react';
import { DatabaseType } from 'src/services/data_service';
import CurrentPlan from '../CurrentPlan/CurrentPlan';
import PlanTimer from '../PlanTimer/PlanTimer';
import Ranking from '../Ranking/Ranking';
import {
  StartPlanContainer,
  TimerTitle,
  UserInfoSection,
  UserInfoContainer,
  UserCharacterName,
  LogoutBtn,
  RankingContainer,
  EmptySection,
  AllSection,
} from './StartPlan.style';

type PropType = {
  logout: () => void;
  uid: string | null;
  databaseService: DatabaseType;
};
const StartPlan: React.FC<PropType> = ({ logout, uid, databaseService }) => {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    databaseService.getLoginUserData(uid, (character) => {
      setCurrentUser(character);
    });
  }, []);

  return (
    <StartPlanContainer>
      <AllSection>
        <TimerTitle>Start Planning 🏃‍♀️🏃‍♂️</TimerTitle>
        <UserInfoSection>
          {currentUser && (
            <UserInfoContainer>
              <UserCharacterName>{currentUser}</UserCharacterName>님 접속 중
            </UserInfoContainer>
          )}
          <LogoutBtn onClick={logout}>Logout</LogoutBtn>
        </UserInfoSection>
        <PlanTimer uid={uid} databaseService={databaseService} />
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
