import styled, { keyframes } from 'styled-components';
import {
  MainBackgroundColor,
  BlackColor,
  WhiteColor,
  StrongMainColor,
  NotiColor,
} from '../../utils/css-utils';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 500px;
  background-color: ${MainBackgroundColor};
  border-radius: 10px;
  box-shadow: 10px 10px 13px 5px rgba(0, 10, 18, 1);
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-basis: 80%;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-right: 3px solid ${BlackColor};
  padding: 0 15px;
  flex-basis: 50%;
`;

export const Title = styled.h1`
  font-size: 35px;
`;

const flow = keyframes`
  0% {
    opacity: 0.1;
  }
  100%{
    opacity: 1;
  }
`;

export const Description = styled.p`
  font-size: 20px;
  animation: ${flow} 3s linear infinite;
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const ButtonTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

export const InputText = styled.input`
  width: 80%;
  margin-bottom: 10px;
  font-size: 1.2rem;
  padding: 5px 10px;
`;

export const Button = styled.button`
  font-size: 20px;
  background-color: white;
  width: 80%;
  padding: 5px 10px;
  border-radius: 15px;
  margin-bottom: 20px;
  outline: none;
  cursor: pointer;
  transition: all 300ms ease;
  &:hover {
    background-color: ${StrongMainColor};
    color: ${WhiteColor};
  }
`;

export const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SignUpText = styled.span`
  margin-right: 10px;
`;

export const SignUpButton = styled.button`
  font-size: 15px;
  font-weight: bold;
  color: ${NotiColor};
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${BlackColor};
  color: ${WhiteColor};
  border-radius: 0 0 10px 10px;
  font-size: 25px;
`;
