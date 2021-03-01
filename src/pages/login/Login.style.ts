import { mobileQuery } from './../../utils/css-utils';
import styled, { keyframes } from 'styled-components';
import {
  MainBackgroundColor,
  BlackColor,
  WhiteColor,
  StrongMainColor,
  NotiColor,
  BoxShadow,
} from '../../utils/css-utils';
import { ReactComponent as GithubSVG } from '../../assets/svg/github-brands.svg';
import { ReactComponent as MailSVG } from '../../assets/svg/envelope-solid.svg';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 500px;
  background-color: ${MainBackgroundColor};
  border-radius: 10px;
  box-shadow: ${BoxShadow};
  ${mobileQuery} {
    width: 400px;
    height: 100%;
  }
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-basis: 80%;
  ${mobileQuery} {
    flex-direction: column;
  }
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
  ${mobileQuery} {
    border-right: 0;
    border-bottom: 3px solid ${BlackColor};
  }
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
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const FormTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

export const InputText = styled.input`
  width: 80%;
  margin-bottom: 10px;
  font-size: 1.2rem;
  padding: 5px 10px;
  ${mobileQuery} {
    max-width: 60%;
  }
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
  ${mobileQuery} {
    max-width: 60%;
  }
`;

export const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  ${mobileQuery} {
    margin-bottom: 15px;
  }
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${BlackColor};
  color: ${WhiteColor};
  border-radius: 0 0 10px 10px;
  font-size: 25px;
`;

export const Contact = styled.span`
  position: absolute;
  right: 0;
  ${mobileQuery} {
    bottom: 0;
    left: 40%;
  }
`;

export const GithubBtn = styled.a`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const GithubIcon = styled(GithubSVG)`
  width: 30px;
  height: 30px;
  color: white;
  &:hover {
    color: ${MainBackgroundColor};
  }
  transition: color 200ms ease-in;
`;

export const MailBtn = styled.a`
  margin: 0 20px;
  background-color: transparent;
  border: none;
  outline: none;
  text-decoration: none;
`;

export const MailIcon = styled(MailSVG)`
  width: 30px;
  height: 30px;
  color: white;
  &:hover {
    color: ${MainBackgroundColor};
  }
  transition: color 200ms ease-in;
`;
