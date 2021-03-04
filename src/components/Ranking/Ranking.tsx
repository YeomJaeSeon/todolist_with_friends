import React, { useEffect, useState } from 'react';
import { UserStateType } from '../StartPlan/StartPlan';
import * as S from './Ranking.style';

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

  useEffect(() => {
    setRankers(userInfo);
  }, [userInfo]);

  return (
    <S.RankingContainer>
      <S.RankingTitle>Ranking</S.RankingTitle>
      <S.UserList>
        {rankers.map((user, idx) => {
          return (
            <S.User rank={idx} key={user.userName}>
              <S.RankNum>{idx + 1}등</S.RankNum>
              <S.RankName>
                {idx <= 2 ? <S.CrwonIcon /> : <S.NoRankerUser></S.NoRankerUser>}
                {user.userName}
              </S.RankName>
              <S.RankTIme>{`${hour(user.time)}시간 ${minute(
                user.time
              )}분`}</S.RankTIme>
            </S.User>
          );
        })}
      </S.UserList>
    </S.RankingContainer>
  );
};

export default Ranking;
