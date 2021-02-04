import styled from 'styled-components';
import { MainBackgroundColor, NotiColor } from '../../utils/css-utils';

export const SignUpForm = styled.form`
  position: relative;
  width: 500px;
  height: 600px;
  background-color: ${MainBackgroundColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 10px 10px 13px 5px rgba(0, 10, 18, 1);
`;

export const SignUpTitle = styled.h1`
  font-size: 3rem;
`;

export const SignUpLabel = styled.label`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;
export const SignUpBox = styled.div`
  width: 60%;
  margin-bottom: 15px;
  display: flex;
  position: relative;
`;

export const SinUpInput = styled.input`
  width: 100%;
  font-size: 1.2rem;
  padding: 5px 10px;
`;

export const CheckIcon = styled.span`
  position: absolute;
  line-height: 36px;
  right: -20px;
`;

type SignUpButtonType = {
  isComplete: boolean;
};

export const SignUpBtn = styled.button`
  border-radius: 10px;
  margin-top: 15px;
  padding: 5px 8px;
  font-size: 20px;
  outline: none;
  border: none;
  opacity: ${(props: SignUpButtonType) => (props.isComplete ? '1' : '0.3')};
  cursor: ${(props: SignUpButtonType) =>
    props.isComplete ? 'pointer' : 'default'};
`;

export const BackLoginContainer = styled.div`
  position: absolute;
  bottom: 15px;
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
