import React, { useState, useEffect } from 'react';
import * as S from './PlanTimer.style';
import { ReactComponent as PlaySVG } from '../../assets/svg/play-solid.svg';
import { ReactComponent as StopSVG } from '../../assets/svg/stop-solid.svg';
import { ReactComponent as PauseSVG } from '../../assets/svg/pause-solid.svg';
import { UserStateType } from '../StartPlan/StartPlan';
import { ReactComponent as MusicSVG } from '../../assets/svg/music-solid.svg';
import { ReactComponent as MusicStopSVG } from '../../assets/svg/volume-mute-solid.svg';
import * as Music from 'src/services/music_service';

let TimerVal: NodeJS.Timeout;

const hours = (time: number | undefined): string | number | undefined => {
  if (time)
    return time && Math.floor(time / 3600) > 9
      ? time && Math.floor(time / 3600)
      : time && `0${Math.floor(time / 3600)}`;
  else {
    return '00';
  }
};
const minutes = (time: number | undefined): string | number | undefined => {
  if (time)
    return time && Math.floor(time / 60) % 60 > 9
      ? time && Math.floor(time / 60) % 60
      : time && `0${Math.floor(time / 60) % 60}`;
  else {
    return '00';
  }
};
const seconds = (time: number | undefined): string | number | undefined => {
  if (time)
    return time && time % 60 > 9 ? time && time % 60 : time && `0${time % 60}`;
  else {
    return '00';
  }
};

type PropType = {
  uid: string | null;
  userInfo: UserStateType;
  modalDisplay: boolean;
  increaseTime: () => void;
  resetTime: () => void;
};

const PlanTimer: React.FC<PropType> = ({
  uid,
  userInfo,
  modalDisplay,
  increaseTime,
  resetTime,
}) => {
  const [state, setState] = useState(false);
  const [musicState, setMusicState] = useState(false);

  const time = userInfo.find((user) => user.uid === uid)?.time;

  useEffect(() => {
    return () => logout();
  }, []);

  useEffect(() => {
    stop();
  }, [modalDisplay]);

  const logout = () => {
    stop();
    setMusicState(false);
    Music.musicStop();
  };

  const start = () => {
    setState(true);
    TimerVal = setInterval(() => {
      increaseTime();
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
    resetTime();
  };

  const musicPlayOrStop = () => {
    setMusicState((musicState) => {
      if (!musicState === true) Music.musicPlay();
      else Music.musicStop();

      return !musicState;
    });
  };

  return (
    <S.PlanTimerContainer>
      <S.TimerTitleContainer>
        <S.TimerTitle>TIMER 🕒</S.TimerTitle>
        <S.MusicBtn onClick={musicPlayOrStop}>
          {!musicState ? (
            <S.MusicIcon as={MusicSVG} />
          ) : (
            <S.MusicIcon as={MusicStopSVG} />
          )}
        </S.MusicBtn>
      </S.TimerTitleContainer>
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
