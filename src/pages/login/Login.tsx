import React, { useEffect, useRef } from 'react';
import * as S from './Login.style';
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

  const loginHandler = () => {
    // 로그인 상태유지를위한 쿠키 설정 (로그인하면)
    const email = emailRef.current && emailRef.current.value;
    const pwd = pwdRef.current && pwdRef.current.value;
    if (email && pwd) {
      authService
        .login(email, pwd)
        .then(() => {
          // if(cookies.login)
          setCookie('login', true, { maxAge: 3 });
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

    const unscribe = authService.onAuthStatus((user: AuthType) => {
      user && goToMain(user.uid);
    });
    return () => {
      unscribe();
    };
  }, [authService, history]);

  return (
    <S.LoginContainer>
      <S.ContentContainer>
        <S.Logo src="/logo.png" alt="logo" />
        <S.Title>TodoList</S.Title>
        <S.Description>What is your first small step?</S.Description>
        <S.FormContainer onSubmit={(e) => e.preventDefault()}>
          <S.FormTitle>Login to your account</S.FormTitle>
          <S.InputText ref={emailRef} type="text" placeholder="Email address" />
          <S.InputText ref={pwdRef} type="password" placeholder="Password" />
          <S.Button onClick={loginHandler}>Sign in</S.Button>
          <S.SignUpContainer>
            <S.SignUpText>처음 방문하셨나요?</S.SignUpText>
            <S.SignUpButton onClick={goToSignUp}>Sign Up</S.SignUpButton>
          </S.SignUpContainer>
        </S.FormContainer>
      </S.ContentContainer>
    </S.LoginContainer>
  );
};

export default Login;
