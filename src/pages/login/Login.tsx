import React, { useEffect, useRef } from 'react';
import {
  LoginContainer,
  ContentContainer,
  TextContainer,
  Title,
  Description,
  FormContainer,
  FormTitle,
  InputText,
  Button,
  SignUpContainer,
  SignUpText,
  SignUpButton,
  Footer,
  GithubIcon,
  MailIcon,
  Contact,
  GithubBtn,
  MailBtn,
} from './Login.style';
import { AuthServiceType } from '../../services/auth_service';
import { useHistory } from 'react-router-dom';
import { AuthType } from '../../services/firebase';

type PropType = {
  authService: AuthServiceType;
};
const Login = ({ authService }: PropType) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const loginHandler = () => {
    const email = emailRef.current && emailRef.current.value;
    const pwd = pwdRef.current && pwdRef.current.value;
    if (email && pwd) {
      authService
        .login(email, pwd)
        .then((value) => {
          alert('로그인 성공');
        })
        .catch((err) => {
          console.log(err.code);
          if (err.code === 'auth/user-not-found') {
            alert('존재하지 않는 아이디입니다.');
          } else if (err.code === 'auth/invalid-email') {
            alert('잘못된 이메일 형식입니다.');
          } else if (err.code === 'auth/wrong-password') {
            alert('잘못된 비밀번호입니다.');
          } else if (err.code === 'auth/too-many-requests') {
            alert('너무많이 틀렸습니다. 잠시후 시도해주세요');
          } else {
            alert(err.message);
          }
        });
    } else {
      alert('이메일이나 비밀번호를 입력해주세요');
    }
  };

  const goToSignUp = () => {
    history.push('/signup');
  };
  useEffect(() => {
    const goToMain = (uid: string) => {
      history.push({
        pathname: '/main',
        state: { id: uid },
      });
    };

    authService.onAuthStatus((user: AuthType) => {
      user && goToMain(user.uid);
    });
    return authService.onAuthStatus();
  }, [authService, history]);

  return (
    <LoginContainer>
      <ContentContainer>
        <TextContainer>
          <Title>Todo List 🏃‍♂️🏃‍♀️🏃‍♂🏃‍♀️</Title>
          <Description>What is your first small step🦶?</Description>
        </TextContainer>
        <FormContainer onSubmit={(e) => e.preventDefault()}>
          <FormTitle>Please Login</FormTitle>
          <InputText
            ref={emailRef}
            type="text"
            placeholder="이메일 입력해주세요."
          />
          <InputText
            ref={pwdRef}
            type="password"
            placeholder="비밀번호 입력해주세요."
          />
          <Button onClick={loginHandler}>Login</Button>
          <SignUpContainer>
            <SignUpText>처음 방문하셨나요?</SignUpText>
            <SignUpButton onClick={goToSignUp}>Sign Up</SignUpButton>
          </SignUpContainer>
        </FormContainer>
      </ContentContainer>
      <Footer>
        Show your passion!!🥇🥇🥇
        <Contact>
          <GithubBtn href="https://github.com/YeomJaeSeon" target="_blank">
            <GithubIcon />
          </GithubBtn>
          <MailBtn href="mailto:a89541457@gmail.com">
            <MailIcon />
          </MailBtn>
        </Contact>
      </Footer>
    </LoginContainer>
  );
};

export default Login;
