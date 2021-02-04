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
      <Editor />
      <Timer logout={logoutHandler} />
    </MainContainer>
  );
};

export default Main;
