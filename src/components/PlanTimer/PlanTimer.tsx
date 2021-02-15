import React, { useState, useEffect } from 'react';
import { PlanTimerContainer, TimeSection, Btns, Icon } from './PlanTimer.style';
import { ReactComponent as PlaySVG } from '../../assets/svg/play-solid.svg';
import { ReactComponent as StopSVG } from '../../assets/svg/stop-solid.svg';
import { ReactComponent as PauseSVG } from '../../assets/svg/pause-solid.svg';

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

const PlanTimer = () => {
  const [time, setTime] = useState(0);
  const [state, setState] = useState(false);

  useEffect(() => {
    return () => stop();
    // clean up함수로 메모리 누수방지
  }, []);

  const start = () => {
    setState(true);
    TimerVal = setInterval(() => {
      setTime((time) => time + 1);
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
    stop();
    setTime(0);
  };

  return (
    <PlanTimerContainer>
      <TimeSection>
        {hours(time)} : {minutes(time)} : {seconds(time)}
      </TimeSection>
      <Btns onClick={startOrStop}>
        {!state ? <Icon as={PlaySVG} /> : <Icon as={PauseSVG} />}
      </Btns>
      <Btns onClick={reset}>
        <Icon as={StopSVG} />
      </Btns>
    </PlanTimerContainer>
  );
};

export default PlanTimer;
