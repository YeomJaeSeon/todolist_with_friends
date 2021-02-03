import styled from 'styled-components';
import { MainBackgroundColor } from '../../utils/css-utils';

export const SignUpForm = styled.form`
  width: 500px;
  height: 600px;
  background-color: ${MainBackgroundColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
