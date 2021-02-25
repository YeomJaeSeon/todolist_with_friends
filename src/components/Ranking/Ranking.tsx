import React, { useEffect, useState } from 'react';
import { DatabaseType } from 'src/services/data_service';
import * as S from './Ranking.style';

type PropType = {
  databaseService: DatabaseType;
};

type StateType = {
  time: number;
  userName: string;
}[];

const hour = (time: number): number => Math.floor(time / 3600);
const minute = (time: number): number => Math.floor(time / 60) % 60;

const Ranking: React.FC<PropType> = ({ databaseService }) => {
  const [rankers, setRankers] = useState<StateType>([]);

  useEffect(() => {
    const datasSync = databaseService.getUserDatas((datas) => {
      if (datas) {
        const infos = Object.keys(datas)
          .map((key) => ({
            time: +datas[key].time,
            userName: datas[key].userName,
          }))
          .sort((a, b) => {
            if (a.time > b.time) return -1;
            if (a.time < b.time) return 1;
            else return 0;
          });
        setRankers(infos);
      } else {
        setRankers([]);
      }
    });

    return () => datasSync();
  }, []);

  return (
    <S.RankingContainer>
      <S.RankingTitle>랭킹</S.RankingTitle>
      <S.UserList>
        {rankers.map((user, idx) => {
          return (
            <S.User rank={idx} key={user.userName}>
              <S.rankNum>{idx + 1}등</S.rankNum>
              <S.rankName>
                {idx <= 2 ? <S.CrwonIcon /> : <S.NoRankerUser></S.NoRankerUser>}
                {user.userName}
              </S.rankName>
              <S.rankTIme>{`${hour(user.time)}시간 ${minute(
                user.time
              )}분`}</S.rankTIme>
            </S.User>
          );
        })}
      </S.UserList>
    </S.RankingContainer>
  );
};

export default Ranking;
