import React, { useState, useEffect } from 'react';
import {
  RunningIcon,
  BreakIcon,
  PlanTimerContainer,
  TimerTitleContainer,
  StatusComment,
  MusicBtn,
  MusicIcon,
  TimerContainer,
  TimeSection,
  Btns,
  Icon,
} from './PlanTimer.style';
import { ReactComponent as PlaySVG } from '../../assets/svg/play-solid.svg';
import { ReactComponent as StopSVG } from '../../assets/svg/undo-alt-solid.svg';
import { ReactComponent as PauseSVG } from '../../assets/svg/pause-solid.svg';
import { UserStateType } from '../StartPlan/StartPlan';
import { ReactComponent as MusicSVG } from '../../assets/svg/music-solid.svg';
import { ReactComponent as MusicStopSVG } from '../../assets/svg/volume-mute-solid.svg';
import * as Music from 'src/services/music_service';

let TimerVal: NodeJS.Timeout;

// display할 시간으로 변경하는 함수(sec -> hours)
const hours = (time: number | undefined): string | number | undefined => {
  if (time)
    return time && Math.floor(time / 3600) > 9
      ? time && Math.floor(time / 3600)
      : time && `0${Math.floor(time / 3600)}`;
  else {
    return '00';
  }
};
// display할 분으로 변경하는 함수(sec -> minutes)
const minutes = (time: number | undefined): string | number | undefined => {
  if (time)
    return time && Math.floor(time / 60) % 60 > 9
      ? time && Math.floor(time / 60) % 60
      : time && `0${Math.floor(time / 60) % 60}`;
  else {
    return '00';
  }
};
// display할 초로 변경하는 함수(sec -> sec)
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

  // 컴포넌트 언마운트시 시간과 음악 멈춤
  useEffect(() => {
    const logout = () => {
      stop();
      Music.musicStop();
    };
    return () => logout();
  }, []);

  // 모달 display되도 시간은 멈춤 - 사용자 변경하는부분은 시간공부타이머에 추가하면안되므로
  useEffect(() => {
    stop();
  }, [modalDisplay]);

  // timer start
  const start = () => {
    setState(true);
    TimerVal = setInterval(() => {
      increaseTime();
    }, 1000);
  };
  // timer start or stop - icon변경등을 위함.
  const startOrStop = () => {
    if (state === false) {
      start();
    } else {
      stop();
    }
  };

  // timer stop
  const stop = () => {
    setState(false);
    clearInterval(TimerVal);
  };

  // timer reset
  const reset = () => {
    if (time === 0) return;
    const userResponse = window.confirm(
      '누르면 시간이 초기화 됩니다. 그래도 누르시겠습니까?'
    );
    if (!userResponse) return;
    stop();
    resetTime();
  };

  // music play or stop
  const musicPlayOrStop = () => {
    setMusicState((music) => {
      if (music) {
        Music.musicStop();
      } else {
        Music.musicPlay();
      }
      return !music;
    });
  };

  return (
    <PlanTimerContainer>
      <TimerContainer>
        <MusicBtn onClick={musicPlayOrStop}>
          {!musicState ? (
            <MusicIcon as={MusicSVG} />
          ) : (
            <MusicIcon as={MusicStopSVG} />
          )}
        </MusicBtn>
        <TimeSection>
          {hours(time)} : {minutes(time)} : {seconds(time)}
        </TimeSection>
        <Btns onClick={reset} btnType="reset">
          <Icon as={StopSVG} />
        </Btns>
      </TimerContainer>
      <TimerTitleContainer>
        <StatusComment type={state === true ? 'show' : undefined}>
          <RunningIcon />
          Running
        </StatusComment>
        <Btns onClick={startOrStop} btnType="start">
          {!state ? <Icon as={PlaySVG} /> : <Icon as={PauseSVG} />}
        </Btns>
        <StatusComment type={state === false ? 'show' : undefined}>
          <BreakIcon />
          break
        </StatusComment>
      </TimerTitleContainer>
    </PlanTimerContainer>
  );
};

export default PlanTimer;
