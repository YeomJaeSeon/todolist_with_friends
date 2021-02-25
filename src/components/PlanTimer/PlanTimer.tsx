import React, { useState, useEffect } from 'react';
import * as S from './PlanTimer.style';
import { ReactComponent as PlaySVG } from '../../assets/svg/play-solid.svg';
import { ReactComponent as StopSVG } from '../../assets/svg/stop-solid.svg';
import { ReactComponent as PauseSVG } from '../../assets/svg/pause-solid.svg';
import { DatabaseType } from 'src/services/data_service';

let TimerVal: NodeJS.Timeout;

const hours = (time: number): string | number =>
  Math.floor(time / 3600) > 9
    ? Math.floor(time / 3600)
    : `0${Math.floor(time / 3600)}`;
const minutes = (time: number): string | number =>
  Math.floor(time / 60) % 60 > 9
    ? Math.floor(time / 60) % 60
    : `0${Math.floor(time / 60) % 60}`;
const seconds = (time: number): string | number =>
  time % 60 > 9 ? time % 60 : `0${time % 60}`;

type PropType = {
  uid: string | null;
  databaseService: DatabaseType;
  modalDisplay: boolean;
};

const PlanTimer: React.FC<PropType> = ({
  uid,
  databaseService,
  modalDisplay,
}) => {
  const [time, setTime] = useState(0);
  const [state, setState] = useState(false);

  useEffect(() => {
    const timeSync = databaseService.timeSync(uid, (time) => {
      if (time) setTime(+time);
    });

    return () => timeSync();
  }, []);

  useEffect(() => {
    return () => stop();
  }, []);

  useEffect(() => {
    stop();
  }, [modalDisplay]);

  const start = () => {
    setState(true);
    TimerVal = setInterval(() => {
      setTime((time) => {
        databaseService.updateTime(uid, time + 1);
        return time + 1;
      });
    }, 1000);
  };

  const startOrStop = () => {
    if (state === false) {
      start();
    } else {
      stop();
    }
  };

  const stop = () => {
    setState(false);
    clearInterval(TimerVal);
  };

  const reset = () => {
    if (time === 0) return;
    const userResponse = window.confirm(
      '누르면 시간이 초기화 됩니다. 그래도 누르시겠습니까?'
    );
    if (!userResponse) return;
    stop();
    setTime(0);
    databaseService.updateTime(uid, 0);
  };

  return (
    <S.PlanTimerContainer>
      <S.TimerTitleContainer>TIMER 🕒</S.TimerTitleContainer>
      <S.TimerContainer>
        <S.TimeSection>
          {hours(time)} : {minutes(time)} : {seconds(time)}
        </S.TimeSection>
        <S.Btns onClick={startOrStop}>
          {!state ? <S.Icon as={PlaySVG} /> : <S.Icon as={PauseSVG} />}
        </S.Btns>
        <S.Btns onClick={reset}>
          <S.Icon as={StopSVG} />
        </S.Btns>
      </S.TimerContainer>
    </S.PlanTimerContainer>
  );
};

export default PlanTimer;
