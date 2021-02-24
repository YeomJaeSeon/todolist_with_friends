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
          .sort((item) => item.time);

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
            <S.User key={user.userName}>
              <span>{idx + 1}</span>
              <span>{user.userName}</span>
              <span>{user.time}</span>
            </S.User>
          );
        })}
      </S.UserList>
    </S.RankingContainer>
  );
};

export default Ranking;
