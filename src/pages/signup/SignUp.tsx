import React, { useState, useEffect } from 'react';
import {
  SignUpForm,
  SignUpTitle,
  SignUpLabel,
  SignUpBox,
  SinUpInput,
  CheckIcon,
  SignUpBtn,
  TooltipMsg,
  BackLoginContainer,
  BackLoginText,
  BackLoginBtn,
} from './SignUp.style';
import { AuthServiceType } from '../../services/auth_service';
import { useHistory } from 'react-router-dom';
import { DatabaseType } from 'src/services/data_service';

const EmailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type PropType = {
  authService: AuthServiceType;
  databaseService: DatabaseType;
};

const SignUp: React.FC<PropType> = ({ authService, databaseService }) => {
  const [isCharacterProper, setIsCharacterProper] = useState(false);
  const [isEmailProper, setIsEmailProper] = useState(false);
  const [isPwdProper, setIsPwdProper] = useState(false);
  const [isPwdLengthProper, setIsPwdLengthProper] = useState(false);
  const [isRePwdLengthProper, setIsRePwdLengthProper] = useState(false);

  const [newUser, setNewUser] = useState({
    character: '',
    email: '',
    pwd: '',
    rePwd: '',
  });
  const [existedUsers, setExistedUsers] = useState<string[]>([]);
  const [isSignUping, setIsSignUping] = useState(false);

  useEffect(() => {
    // 이미 가입한 유저들의 별명들을 가져옴. 비교를위해 중복되면안되닌까
    const getUsers = databaseService.getUserDatas((datas) => {
      if (!datas) setExistedUsers([]);
      else {
        const existedUsersList = Object.keys(datas).map(
          (user) => datas[user].userName
        );
        setExistedUsers(existedUsersList);
      }
    });
    // 클린업
    return () => getUsers();
  }, [databaseService]);

  const history = useHistory();
  const goToLogin = () => {
    history.push('/');
  };
  const signUpHandler = () => {
    if (!isAllClear()) return;
    if (isSignUping) return;
    // 회원가입중이면 아무것도안함.
    if (!isCharacterProper) {
      alert('이미 존재하는 이름입니다.');
      return;
    }

    setIsSignUping(true);
    // 회원가입중
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
      })
      .finally(() => {
        setIsSignUping(false);
        // 회원가입상태 변경.
      });
  };
  // input onChange할때 적절성 판단
  const upDateUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    if (id === 'character') {
      if (value.length > 6) return;
      existedUsers.some((characterName) => value === characterName)
        ? setIsCharacterProper(false)
        : setIsCharacterProper(true);
    } else if (id === 'email') {
      value.match(EmailReg) ? setIsEmailProper(true) : setIsEmailProper(false);
    } else if (id === 'pwd') {
      if (value.length > 8) return;
      if (value.length < 6) {
        setIsPwdLengthProper(false);
      } else {
        setIsPwdLengthProper(true);
      }
      if (newUser.rePwd)
        newUser.rePwd === value ? setIsPwdProper(true) : setIsPwdProper(false);
    } else if (id === 'rePwd') {
      if (value.length > 8) return;
      if (value.length < 6) setIsRePwdLengthProper(false);
      else setIsRePwdLengthProper(true);
      if (newUser.pwd)
        newUser.pwd === value ? setIsPwdProper(true) : setIsPwdProper(false);
    }
    setNewUser((user) => ({ ...user, [id]: value }));
  };
  // 모두 적절한지 아닌지 판단
  const isAllClear = () => {
    if (
      isEmailProper &&
      isPwdProper &&
      newUser.character &&
      isPwdLengthProper &&
      isRePwdLengthProper
    )
      return true;
    else return false;
  };

  return (
    <SignUpForm
      onSubmit={(e) => {
        e.preventDefault();
        signUpHandler();
      }}
    >
      <SignUpTitle>Sign Up</SignUpTitle>
      <SignUpBox>
        <SignUpLabel htmlFor="character">
          사용할 별명 입력하세요(6자리 이하)
        </SignUpLabel>
        <TooltipMsg show={false}>별명칸</TooltipMsg>
        <TooltipMsg show={false}>별명칸</TooltipMsg>
        <SinUpInput
          type="text"
          id="character"
          value={newUser.character}
          onChange={upDateUserInfo}
          placeholder="별명 입력해주세요"
        />
        {newUser.character && <CheckIcon>✔</CheckIcon>}
      </SignUpBox>
      <SignUpBox>
        <SignUpLabel htmlFor="email">이메일 입력하세요</SignUpLabel>
        <TooltipMsg show={false}>이메일칸</TooltipMsg>
        <TooltipMsg show={newUser.email !== '' && isEmailProper === false}>
          이메일 형식에 맞춰주세요
        </TooltipMsg>
        <SinUpInput
          type="text"
          id="email"
          value={newUser.email}
          onChange={upDateUserInfo}
          placeholder="이메일입력해주세요"
        />
        {newUser.email ? (
          isEmailProper ? (
            <CheckIcon>✔</CheckIcon>
          ) : (
            <CheckIcon>❕</CheckIcon>
          )
        ) : null}
      </SignUpBox>
      <SignUpBox>
        <SignUpLabel htmlFor="pwd"> 비밀번호 입력하세요(6 ~ 8자리)</SignUpLabel>
        <TooltipMsg show={newUser.pwd !== '' && isPwdLengthProper === false}>
          최소 6자리 입력해주세요
        </TooltipMsg>
        <TooltipMsg show={newUser.pwd !== '' && isPwdProper === false}>
          비밀번호가 다릅니다
        </TooltipMsg>
        <SinUpInput
          type="password"
          id="pwd"
          value={newUser.pwd}
          onChange={upDateUserInfo}
          placeholder="비밀번호 입력해주세요"
        />
        {newUser.pwd ? (
          isPwdProper && isPwdLengthProper ? (
            <CheckIcon>✔</CheckIcon>
          ) : (
            <CheckIcon>❕</CheckIcon>
          )
        ) : null}
      </SignUpBox>
      <SignUpBox>
        <SignUpLabel htmlFor="rePwd">
          비밀번호 다시 입력하세요(6 ~ 8자리)
        </SignUpLabel>
        <TooltipMsg show={newUser.pwd !== '' && isRePwdLengthProper === false}>
          최소 6자리 입력해주세요
        </TooltipMsg>
        <TooltipMsg show={newUser.pwd !== '' && isPwdProper === false}>
          비밀번호가 다릅니다
        </TooltipMsg>
        <SinUpInput
          type="password"
          id="rePwd"
          value={newUser.rePwd}
          onChange={upDateUserInfo}
          placeholder="비밀번호 다시 입력해주세요"
        />
        {newUser.rePwd ? (
          isPwdProper && isRePwdLengthProper ? (
            <CheckIcon>✔</CheckIcon>
          ) : (
            <CheckIcon>❕</CheckIcon>
          )
        ) : null}
      </SignUpBox>
      <SignUpBtn type="submit" isComplete={isAllClear()}>
        Sign up
      </SignUpBtn>
      <BackLoginContainer>
        <BackLoginText>회원이신가요?</BackLoginText>
        <BackLoginBtn type="button" onClick={goToLogin}>
          Sign In
        </BackLoginBtn>
        <BackLoginText>으로 돌아가기</BackLoginText>
      </BackLoginContainer>
    </SignUpForm>
  );
};

export default SignUp;
