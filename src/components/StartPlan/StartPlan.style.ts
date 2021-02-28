import styled from 'styled-components';
import { mobileQuery } from '../../utils/css-utils';

export const StartPlanContainer = styled.div`
  flex: 1 1 70%;
  display: flex;
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
  margin-bottom: 50px;
`;

export const AllSection = styled.div`
  flex: 1 1 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RankingContainer = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  ${mobileQuery} {
    margin-top: 50px;
    width: 100%;
    height: 500px;
    overflow-y: auto;
  }
`;
