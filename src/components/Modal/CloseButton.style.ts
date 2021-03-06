import styled from 'styled-components';
import { ReactComponent as XSVG } from '../../assets/svg/times-solid.svg';

export const Container = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  font-weight: bolder;
  font-size: 1.2em;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const CancelIcon = styled(XSVG)`
  width: 30px;
  height: 30px;
`;
