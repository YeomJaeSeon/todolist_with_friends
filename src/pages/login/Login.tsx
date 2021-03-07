import React, { useState, useEffect, useRef } from 'react';
import {
  LoginContainer,
  ContentContainer,
  Logo,
  Title,
  Description,
  FormContainer,
  FormTitle,
  InputText,
  SignButton,
  SignUpContainer,
  SignUpText,
  SignUpButton,
} from './Login.style';
import { AuthServiceType } from '../../services/auth_service';
import { useHistory } from 'react-router-dom';
import { AuthType } from '../../services/firebase';
import { CookieSetOptions } from 'universal-cookie';

type PropType = {
  authService: AuthServiceType;
  cookies: {
    [name: string]: any;
  };
  setCookie: (
    name: string,
    value: any,
    options?: CookieSetOptions | undefined
  ) => void;
};
const Login: React.FC<PropType> = ({ authService, cookies, setCookie }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const [isLogining, setIsLogining] = useState(false);

  const loginHandler = () => {
    const email = emailRef.current && emailRef.current.value;
    const pwd = pwdRef.current && pwdRef.current.value;

    // 로그인중 상태이면 아무것도안함.
    if (isLogining) return;

    if (email && pwd) {
      // 로그인중..
      setIsLogining(true);
      authService
        .login(email, pwd)
        .then(() => {
          // 로그인성공 -> 만료기간 1일 쿠키설정
          setCookie('login', true, { maxAge: 60 * 60 * 24 });
          alert('로그인 성공');
        })
        .catch((err) => {
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
        })
        .finally(() => {
          // 로그인끝나면 false로.
          setIsLogining(false);
        });
    } else {
      alert('이메일이나 비밀번호를 입력해주세요');
    }
  };

  const goToSignUp = () => {
    history.push('/signup');
  };

  useEffect(() => {
    // 쿠키없으면 로그아웃
    !cookies.login && authService.logout();

    // main으로 이동하는데 uid데이터를 가지고 이동.
    const goToMain = (uid: string) => {
      history.push({
        pathname: '/main',
        state: { id: uid },
      });
    };
    // 유저의 로그인 상태알수있는 리스너등록. 마운트될떄
    const unscribe = authService.getLoginStatus((user: AuthType) => {
      user && goToMain(user.uid);
    });
    // 당연히 언마운트될때 리스너 함수 해제
    return () => {
      unscribe();
    };
  }, [authService, history, cookies.login]);

  return (
    <LoginContainer>
      <ContentContainer>
        <Logo src="/logo.png" alt="logo" />
        <Title>TodoList</Title>
        <Description>What is your first small step?</Description>
        <FormContainer
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler();
          }}
        >
          <FormTitle>Login to your account</FormTitle>
          <InputText ref={emailRef} type="text" placeholder="Email address" />
          <InputText ref={pwdRef} type="password" placeholder="Password" />
          <SignButton>Sign in</SignButton>
          <SignUpContainer>
            <SignUpText>처음 방문하셨나요?</SignUpText>
            <SignUpButton type="button" onClick={goToSignUp}>
              Sign Up
            </SignUpButton>
          </SignUpContainer>
        </FormContainer>
      </ContentContainer>
    </LoginContainer>
  );
};

export default Login;
