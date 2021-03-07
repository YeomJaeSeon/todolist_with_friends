import React, { useEffect, useState } from 'react';
import { UserStateType } from '../StartPlan/StartPlan';
import {
  RankingContainer,
  RankingTitle,
  UserList,
  CrwonIcon,
  NoRankerUser,
  User,
  RankNum,
  RankName,
  RankTIme,
} from './Ranking.style';

type PropType = {
  userInfo: UserStateType;
};

type StateType = {
  time: number;
  userName: string;
}[];

const hour = (time: number): number => Math.floor(time / 3600);
const minute = (time: number): number => Math.floor(time / 60) % 60;

const Ranking: React.FC<PropType> = ({ userInfo }) => {
  const [rankers, setRankers] = useState<StateType>([]);

  // user정보 수정되면 랭킹 부분도 변경되야하므로.
  useEffect(() => {
    setRankers(userInfo);
  }, [userInfo]);

  return (
    <RankingContainer>
      <RankingTitle>Ranking</RankingTitle>
      <UserList>
        {rankers.map((user, idx) => {
          return (
            <User rank={idx} key={user.userName}>
              <RankNum>{idx + 1}등</RankNum>
              <RankName>
                {idx <= 2 ? <CrwonIcon /> : <NoRankerUser></NoRankerUser>}
                {user.userName}
              </RankName>
              <RankTIme>{`${hour(user.time)}시간 ${minute(
                user.time
              )}분`}</RankTIme>
            </User>
          );
        })}
      </UserList>
    </RankingContainer>
  );
};

export default Ranking;
