import styled from 'styled-components';
import { mobileQuery, StrongMainColor } from '../../utils/css-utils';

export const StartPlanContainer = styled.div`
  margin-top: 70px;
  width: 100%;
  flex: 1 1 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  ${mobileQuery} {
    flex: 1 1 70%;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: url('/background.jpg') center/cover no-repeat;
    opacity: 0.9;
  }
`;

export const TimerTitle = styled.h1`
  font-size: 50px;
  margin: 20px 0;
`;

export const AllSection = styled.div`
  flex: 1 1 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  background-color: #bdbdbd;
`;

export const RankingContainer = styled.div`
  width: 100%;
  height: 680px;
  display: flex;
  flex-direction: column;
  ${mobileQuery} {
    margin-top: 50px;
    width: 100%;
    height: 500px;
    overflow-y: auto;
  }
`;
