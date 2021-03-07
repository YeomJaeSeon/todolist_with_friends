import React from 'react';
import {
  HeaderContainer,
  HeaderSection,
  HeaderTitle,
  HeaderLogo,
  UserInfo,
  CurrentUser,
  UserIcon,
  CharacterName,
  Logout,
  UserSection,
  MoveBtn,
} from './Header.style';

type PropType = {
  logout: () => void;
  currentUser: string;
  openModal: () => void;
  goToSection: (id: string) => void;
  pending: boolean;
};

const Header: React.FC<PropType> = ({
  currentUser,
  logout,
  openModal,
  goToSection,
  pending,
}) => {
  // scroll을 위해 역방향 흐름 추가
  const goToOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    goToSection(id);
  };

  return (
    <HeaderContainer>
      <HeaderSection>
        <HeaderLogo src="/logo.png" alt="logo" />
        <HeaderTitle>TodoList with Friends</HeaderTitle>
      </HeaderSection>
      {!pending && (
        <UserInfo>
          <MoveBtn id="timer" onClick={goToOption}>
            Timer
          </MoveBtn>
          <MoveBtn id="ranking" onClick={goToOption}>
            Ranking
          </MoveBtn>
          <CurrentUser>
            <CharacterName>{currentUser}</CharacterName>님 접속중
          </CurrentUser>
          <UserSection onClick={openModal}>
            <UserIcon />
          </UserSection>
          <Logout onClick={logout}>Logout</Logout>
        </UserInfo>
      )}
    </HeaderContainer>
  );
};

export default Header;
