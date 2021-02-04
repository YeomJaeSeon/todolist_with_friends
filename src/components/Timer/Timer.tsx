import React from 'react';
import { TimerContainer, LogoutBtn } from './Timer.style';

type PropType = {
  logout: () => void;
};
const Timer: React.FC<PropType> = ({ logout }) => {
  return (
    <TimerContainer>
      <LogoutBtn onClick={logout}>Logout</LogoutBtn>
    </TimerContainer>
  );
};

export default Timer;
