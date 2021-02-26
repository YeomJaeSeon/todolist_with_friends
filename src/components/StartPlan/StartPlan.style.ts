import styled from 'styled-components';
import { MainBackgroundColor } from '../../utils/css-utils';

export const StartPlanContainer = styled.div`
  flex: 1;
  display: flex;
  background-color: ${MainBackgroundColor};
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
`;

export const EmptySection = styled.div`
  height: 70px;
  width: 100%;
`;
