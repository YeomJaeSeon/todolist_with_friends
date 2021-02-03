import React, { useEffect, useState } from 'react';
import { AuthServiceType } from '../../services/auth_service';
import { useHistory, useLocation } from 'react-router-dom';
import {
  MainContainer,
  ListContainer,
  ContentContainer,
  LogoutBtn,
} from './Main.style';
import InputTodoCard from 'src/components/InputTodoCard/InputTodoCard';

type PropType = {
  authService: AuthServiceType;
};
const Main = ({ authService }: PropType) => {
  // const [todos, setTodos] = useState({
  //   1: {
  //     id : 1,

  //   }
  //   2: {

  //   }
  // });
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
  return (
    <MainContainer>
      <ListContainer>
        <h1>Plan your todos</h1>
        <InputTodoCard />
      </ListContainer>
      <ContentContainer>
        <LogoutBtn onClick={logoutHandler}>Logout</LogoutBtn>
      </ContentContainer>
    </MainContainer>
  );
};

export default Main;
