import styled from 'styled-components';
import { MainBackgroundColor, NotiColor } from '../../utils/css-utils';

export const StartPlanContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  background-color: ${MainBackgroundColor};
`;

export const TimerTitle = styled.h1`
  margin-bottom: 50px;
`;

export const UserInfoSection = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
`;

export const UserInfoContainer = styled.span`
  margin-right: 8px;
`;

export const UserCharacterName = styled.span`
  color: ${NotiColor};
`;

export const LogoutBtn = styled.button`
  font-size: 15px;
  font-weight: bold;
  color: ${NotiColor};
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
export const AllSection = styled.div`
  flex: 1 1 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RankingContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
`;

export const EmptySection = styled.div`
  height: 70px;
  width: 100%;
`;
