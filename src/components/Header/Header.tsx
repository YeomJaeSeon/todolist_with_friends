import React from 'react';
import * as S from './Header.style';

type PropType = {
  logout: () => void;
  currentUser: string;
  openModal: () => void;
  goToSection: (id: string) => void;
};

const Header: React.FC<PropType> = ({
  currentUser,
  logout,
  openModal,
  goToSection,
}) => {
  const goToOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    goToSection(id);
  };

  return (
    <S.HeaderContainer>
      <S.HeaderSection>
        <S.HeaderLogo src="/logo.png" alt="logo" />
        <S.HeaderTitle>TodoList with Friends</S.HeaderTitle>
      </S.HeaderSection>
      {currentUser && (
        <S.UserInfo>
          <S.MoveBtn id="timer" onClick={goToOption}>
            Timer
          </S.MoveBtn>
          <S.MoveBtn id="ranking" onClick={goToOption}>
            Ranking
          </S.MoveBtn>
          <S.CurrentUser>
            <S.CharacterName>{currentUser}</S.CharacterName>님 접속중
          </S.CurrentUser>
          <S.UserSection onClick={openModal}>
            <S.UserIcon />
          </S.UserSection>
          <S.Logout onClick={logout}>Logout</S.Logout>
        </S.UserInfo>
      )}
    </S.HeaderContainer>
  );
};

export default Header;
