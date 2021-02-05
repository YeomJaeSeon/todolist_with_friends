import React, { useEffect, useState } from 'react';
import { AuthServiceType } from '../../services/auth_service';
import { useHistory, useLocation } from 'react-router-dom';
import { MainContainer } from './Main.style';
import Editor from 'src/components/Editor/Editor';
import Timer from 'src/components/Timer/Timer';

type PropType = {
  authService: AuthServiceType;
};

const Main = ({ authService }: PropType) => {
  const [cards, setCards] = useState<number[]>([]);

  const location = useLocation();
  console.log(location.state);
  //  로그인한 사람의 uid를받음

  const history = useHistory();
  useEffect(() => {
    authService.onAuthStatus((user) => {
      if (!user) {
        history.push('/');
      }
    });
  }, []);
  const logoutHandler = () => {
    authService.logout();
  };

  const addCard = (id: number) => {
    setCards((cards) => [...cards, id]);
  };
  const deleteCard = (selectedId: number) => {
    setCards((cards) => cards.filter((id) => id !== selectedId));
  };
  return (
    <MainContainer>
      <Editor cards={cards} addCard={addCard} onDeleteCard={deleteCard} />
      <Timer logout={logoutHandler} />
    </MainContainer>
  );
};

export default Main;
