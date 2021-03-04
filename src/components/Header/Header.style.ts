import {
  NotiColor,
  StrongMainColor,
  WhiteColor,
  MainBackgroundColor,
} from 'src/utils/css-utils';
import styled from 'styled-components';
import { ReactComponent as UserSVG } from '../../assets/svg/user-cog-solid.svg';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  background-color: ${StrongMainColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 3;
`;
export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;
export const HeaderTitle = styled.h1`
  font-size: 1.3rem;
  margin-left: 10px;
  color: ${MainBackgroundColor};
`;

export const HeaderLogo = styled.img`
  width: 50px;
  height: 50px;
`;

export const UserInfo = styled.div`
  display: flex;
  font-size: 1rem;
  align-items: center;
`;

export const CurrentUser = styled.div`
  margin-right: 20px;
  color: ${MainBackgroundColor};
`;

export const UserIcon = styled(UserSVG)`
  width: 30px;
  height: 30px;
  color: ${MainBackgroundColor};
`;

export const CharacterName = styled.span``;

export const Logout = styled.button`
  margin-right: 20px;
  font-size: 15px;
  font-weight: bold;
  color: ${MainBackgroundColor};
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

export const UserSection = styled.button`
  background-color: transparent;
  border: none;
  color: #1976d2;
  cursor: pointer;
  font-size: 15px;
  font-weight: bolder;
  margin-right: 10px;
  padding: 0;
  &:hover {
    transform: scale(1.1);
  }
`;

export const MoveBtn = styled.button`
  border: none;
  outline: none;
  font-size: 18px;
  font-weight: bold;
  background-color: transparent;
  margin-right: 20px;
  border: 2px solid ${MainBackgroundColor};
  border-radius: 5px;
  padding: 5px 10px;
  color: ${MainBackgroundColor};
  cursor: pointer;
  &:hover {
    background-color: ${MainBackgroundColor};
    color: ${StrongMainColor};
  }
  transition: all 300ms ease;
`;
