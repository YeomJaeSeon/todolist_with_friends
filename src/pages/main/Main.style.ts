import styled, { keyframes } from 'styled-components';
import {
  MainBackgroundColor,
  NotiColor,
  mobileQuery,
} from '../../utils/css-utils';

export const MainContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  background: url('/background.jpg') no-repeat center/cover;
  opacity: 0.9;
  ${mobileQuery} {
    flex-direction: column;
    align-items: center;
    background: none;
  }
`;

export const UserInfoSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  font-weight: bolder;
  ${mobileQuery} {
    top: 10px;
    right: 10px;
    background-color: transparent;
  }
`;

export const CurrentUserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const UserChangeInfo = styled.button`
  background-color: transparent;
  border: none;
  color: ${NotiColor};
  cursor: pointer;
  float: right;
  font-weight: bolder;
  font-size: 1rem;
  margin: 5px 0;
  &:hover {
    transform: scale(1.1);
  }
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

export const PendingBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${MainBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  0%{
    tranform : rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 15px solid white;
  border-top: 15px solid ${NotiColor};
  animation: ${spin} 2s infinite linear;
`;
