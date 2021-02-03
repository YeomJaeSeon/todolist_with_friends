import React, { useEffect } from 'react';
import {
  LoginContainer,
  ContentContainer,
  TextContainer,
  Title,
  Description,
  ButtonContainer,
  ButtonTitle,
  Button,
  Footer,
} from './Login.style';
import { AuthServiceType } from '../../services/auth_service';
import { useHistory } from 'react-router-dom';
import { AuthType } from '../../services/firebase';

type PropType = {
  authService: AuthServiceType;
};
const Login = ({ authService }: PropType) => {
  const history = useHistory();

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    authService.login(e.currentTarget.id);
  };

  const goToMain = (uid: string) => {
    history.push({
      pathname: '/main',
      state: { id: uid },
    });
  };
  useEffect(() => {
    authService.onAuthStatus((user: AuthType) => {
      user && goToMain(user.uid);
    });
  }, []);
  return (
    <LoginContainer>
      <ContentContainer>
        <TextContainer>
          <Title>todo list 🏃‍♂️🏃‍♀️🏃‍♂🏃‍♀️</Title>
          <Description>What is your first small step🦶?</Description>
        </TextContainer>
        <ButtonContainer>
          <ButtonTitle>Please Login</ButtonTitle>
          <Button id="Google" onClick={loginHandler}>
            Google
          </Button>
        </ButtonContainer>
      </ContentContainer>
      <Footer>Show your passion!!🥇🥇🥇</Footer>
    </LoginContainer>
  );
};

export default Login;
