import styled from 'styled-components';
import { WhiteColor, BoxShadow, mobileQuery } from '../../utils/css-utils';
import { ReactComponent as RunningSVG } from '../../assets/svg/running-solid.svg';
import { ReactComponent as BreakSVG } from '../../assets/svg/bed-solid.svg';

export const RunningIcon = styled(RunningSVG)`
  width: 40px;
  height: 40px;
  margin-right: 5px;
  margin-top: 5px;
`;

export const BreakIcon = styled(BreakSVG)`
  width: 40px;
  height: 40px;
  margin-right: 5px;
  margin-top: 5px;
`;

export const PlanTimerContainer = styled.div`
  position: relative;
  width: 550px;
  height: 200px;
  background-color: ${WhiteColor};
  text-align: center;
  font-size: 50px;
  border-radius: 15px;
  box-shadow: ${BoxShadow};
  ${mobileQuery} {
    width: 400px;
    height: 200px;
  }
`;

export const TimerTitleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const StatusComment = styled.span<{ type: 'show' | undefined }>`
  display: flex;
  align-items: center;
  color: gray;
  font-size: 30px;
  visibility: ${(props) => (props.type ? 'visible' : 'hidden')};
`;

export const TimerTitle = styled.h1`
  display: inline-block;
  margin: auto;
  font-size: 3rem;
  margin: 0;
  ${mobileQuery} {
    font-size: 2rem;
  }
`;

export const MusicBtn = styled.button`
  position: absolute;
  top: 45px;
  left: 20px;
  background-color: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  margin-left: 30px;
  ${mobileQuery} {
    top: 30px;
    right: 40px;
  }
`;

export const MusicIcon = styled.div`
  width: 30px;
  height: 30px;
  ${mobileQuery} {
    width: 30px;
    height: 30px;
  }
`;

export const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const TimeSection = styled.section`
  ${mobileQuery} {
    font-size: 2rem;
  }
`;

export const Btns = styled.button<{ btnType: string }>`
  position: ${(props) => props.btnType === 'reset' && 'absolute'};
  top: ${(props) => props.btnType === 'reset' && '35px'};
  right: ${(props) => props.btnType === 'reset' && '30px'};
  margin-top: ${(props) => props.btnType === 'start' && '20px'};
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const Icon = styled.div`
  width: 50px;
  height: 50px;
  ${mobileQuery} {
    width: 30px;
    height: 30px;
  }
`;
