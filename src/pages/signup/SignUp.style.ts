import styled from 'styled-components';
import {
  MainBackgroundColor,
  NotiColor,
  BoxShadow,
  StrongMainColor,
  WhiteColor,
} from '../../utils/css-utils';

export const SignUpForm = styled.form`
  position: relative;
  width: 400px;
  height: 600px;
  background-color: ${MainBackgroundColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${BoxShadow};
`;

export const SignUpTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
  margin: 20px 0;
`;

export const SignUpLabel = styled.label`
  font-size: 1rem;
  margin-top: 10px;
`;
export const SignUpBox = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const TooltipMsg = styled.div<{ show: boolean }>`
  font-size: 12px;
  color: gray;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 200ms ease;
`;

export const SinUpInput = styled.input`
  width: 250px;
  font-size: 1.2rem;
  padding: 8px 10px;
  border-radius: 5px;
  outline: none;
  border: 0.5px gray solid;
`;

export const CheckIcon = styled.span`
  position: absolute;
  width: 30px;
  height: 30px;
  line-height: 30px;
  right: -30px;
  top: 70px;
`;

type SignUpButtonType = {
  isComplete: boolean;
};

export const SignUpBtn = styled.button`
  border-radius: 5px;
  padding: 5px 8px;
  font-size: 20px;
  outline: none;
  background-color: white;
  border: 0.5px gray solid;
  margin: 10px 0;
  opacity: ${(props: SignUpButtonType) => (props.isComplete ? '1' : '0.3')};
  cursor: ${(props: SignUpButtonType) =>
    props.isComplete ? 'pointer' : 'default'};
  &:hover {
    background-color: ${(props: SignUpButtonType) =>
      props.isComplete ? StrongMainColor : 'white'};
    color: ${(props: SignUpButtonType) =>
      props.isComplete ? WhiteColor : 'black'};
  }
  transition: all 300ms ease;
`;

export const BackLoginContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 20px;
`;

export const BackLoginText = styled.span`
  font-size: 15px;
`;

export const BackLoginBtn = styled.button`
  font-size: 15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${NotiColor};
  font-weight: bold;
  &:hover {
    transform: scale(1.1);
  }
`;
