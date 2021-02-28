import React, { useState, useEffect } from 'react';
import {
  SignUpForm,
  SignUpTitle,
  SignUpLabel,
  SignUpBox,
  SinUpInput,
  CheckIcon,
  SignUpBtn,
  BackLoginContainer,
  BackLoginText,
  BackLoginBtn,
} from './SignUp.style';
import { AuthServiceType } from '../../services/auth_service';
import { useHistory } from 'react-router-dom';
import { DatabaseType } from 'src/services/data_service';

const EmailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

type PropType = {
  authService: AuthServiceType;
  databaseService: DatabaseType;
};

const SignUp: React.FC<PropType> = ({ authService, databaseService }) => {
  const [isCharacterProper, setIsCharacterProper] = useState(false);
  const [isEmailProper, setIsEmailProper] = useState(false);
  const [isPwdProper, setIsPwdProper] = useState(false);
  const [isRePwdProper, setIsRePwdProper] = useState(false);
  const [newUser, setNewUser] = useState({
    character: '',
    email: '',
    pwd: '',
    rePwd: '',
  });
  const [existedUsers, setExistedUsers] = useState<string[]>([]);

  useEffect(() => {
    const getUsers = databaseService.getUserDatas((datas) => {
      if (!datas) setExistedUsers([]);
      else {
        const existedUsersList = Object.keys(datas).map(
          (user) => datas[user].userName
        );
        setExistedUsers(existedUsersList);
      }
    });

    return () => getUsers();
  }, [databaseService]);

  const history = useHistory();
  const goToLogin = () => {
    history.push('/');
  };
  const signUpHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isAllClear()) return;
    if (!isCharacterProper) {
      alert('이미 존재하는 이름입니다.');
      return;
    }
    authService
      .signUp(newUser.email, newUser.pwd)
      .then((user) => {
        user &&
          user.user &&
          databaseService.createUser(user.user?.uid, newUser.character);
        alert('회원가입 성공!');
        authService.logout();
        goToLogin();
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          alert('이미 존재하는 이메일입니다.');
        }
      });
  };
  const upDateUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    if (id === 'character') {
      if (value.length > 6) return;
      existedUsers.some((characterName) => value === characterName)
        ? setIsCharacterProper(false)
        : setIsCharacterProper(true);
    } else if (id === 'email') {
      EmailReg.test(value) ? setIsEmailProper(true) : setIsEmailProper(false);
    } else if (id === 'pwd') {
      value.length >= 6 && value.length <= 8
        ? setIsPwdProper(true)
        : setIsPwdProper(false);
    } else if (id === 'rePwd') {
      newUser.pwd === value && value.length >= 6 && value.length <= 8
        ? setIsRePwdProper(true)
        : setIsRePwdProper(false);
    }
    setNewUser((user) => ({ ...user, [id]: value }));
  };
  const isAllClear = () => {
    if (isEmailProper && isRePwdProper && newUser.character) return true;
    else return false;
  };
  return (
    <SignUpForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <SignUpTitle>회원가입</SignUpTitle>
      <SignUpLabel htmlFor="character">
        사용할 별명 입력하세요(6자리 이하)
      </SignUpLabel>
      <SignUpBox>
        <SinUpInput
          type="text"
          id="character"
          value={newUser.character}
          onChange={upDateUserInfo}
          placeholder="별명 입력해주세요."
        />
        {newUser.character && <CheckIcon>✔</CheckIcon>}
      </SignUpBox>
      <SignUpLabel htmlFor="email">이메일 입력하세요</SignUpLabel>
      <SignUpBox>
        <SinUpInput
          type="text"
          id="email"
          value={newUser.email}
          onChange={upDateUserInfo}
          placeholder="이메일입력해주세요."
        />
        {newUser.email ? (
          isEmailProper ? (
            <CheckIcon>✔</CheckIcon>
          ) : (
            <CheckIcon>❕</CheckIcon>
          )
        ) : null}
      </SignUpBox>
      <SignUpLabel htmlFor="pwd"> 비밀번호 입력하세요</SignUpLabel>
      <SignUpBox>
        <SinUpInput
          type="password"
          id="pwd"
          value={newUser.pwd}
          onChange={upDateUserInfo}
          placeholder="최소 6자리, 최대 8자리입니다."
        />
        {newUser.pwd ? (
          isPwdProper ? (
            <CheckIcon>✔</CheckIcon>
          ) : (
            <CheckIcon>❕</CheckIcon>
          )
        ) : null}
      </SignUpBox>
      <SignUpLabel htmlFor="rePwd"> 비밀번호 다시 입력하세요</SignUpLabel>
      <SignUpBox>
        <SinUpInput
          type="password"
          id="rePwd"
          value={newUser.rePwd}
          onChange={upDateUserInfo}
          placeholder="최소 6자리, 최대 8자리입니다."
        />
        {newUser.rePwd ? (
          isRePwdProper ? (
            <CheckIcon>✔</CheckIcon>
          ) : (
            <CheckIcon>❕</CheckIcon>
          )
        ) : null}
      </SignUpBox>
      <SignUpBtn isComplete={isAllClear()} onClick={signUpHandler}>
        가입하기
      </SignUpBtn>
      <BackLoginContainer>
        <BackLoginText>회원이신가요?</BackLoginText>
        <BackLoginBtn onClick={goToLogin}>로그인</BackLoginBtn>
        <BackLoginText>으로 돌아가기</BackLoginText>
      </BackLoginContainer>
    </SignUpForm>
  );
};

export default SignUp;
