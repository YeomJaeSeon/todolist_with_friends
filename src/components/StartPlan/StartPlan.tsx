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
export type UserStateType = {
  uid: string;
  time: number;
  userName: string;
}[];

const StartPlan: React.FC<PropType> = ({
  uid,
  databaseService,
  modalDisplay,
}) => {
  const [usersInfo, setUsersInfo] = useState<UserStateType>([]);

  useEffect(() => {
    const datasSync = databaseService.getUserDatas((datas) => {
      if (datas) {
        const infos = Object.keys(datas)
          .map((key) => ({
            uid: key,
            time: +datas[key].time,
            userName: datas[key].userName,
          }))
          .sort((a, b) => {
            if (a.time > b.time) return -1;
            if (a.time < b.time) return 1;
            else return 0;
          });
        setUsersInfo(infos);
      } else {
        setUsersInfo([]);
      }
    });

    return () => datasSync();
  }, [databaseService]);

  const increaseTime = () => {
    setUsersInfo((infos) => {
      return infos.map((info) => {
        if (info.uid === uid) {
          databaseService.updateTime(uid, info.time + 1);
          return { ...info, time: info.time + 1 };
        }
        return info;
      });
    });
  };

  const resetTime = () => {
    setUsersInfo((infos) => {
      return infos.map((info) => {
        if (info.uid === uid) {
          return { ...info, time: 0 };
        }
        return info;
      });
    });
    databaseService.updateTime(uid, 0);
  };

  return (
    <StartPlanContainer>
      <AllSection>
        <TimerTitle>Start Planning 🏃‍♀️🏃‍♂️</TimerTitle>
        <PlanTimer
          uid={uid}
          userInfo={usersInfo}
          modalDisplay={modalDisplay}
          increaseTime={increaseTime}
          resetTime={resetTime}
        />
        <CurrentPlan uid={uid} databaseService={databaseService} />
      </AllSection>
      <RankingContainer>
        <EmptySection></EmptySection>
        <Ranking userInfo={usersInfo}></Ranking>
      </RankingContainer>
    </StartPlanContainer>
  );
};

export default StartPlan;
