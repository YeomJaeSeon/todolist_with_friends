import styled from 'styled-components';
import { WhiteColor } from '../../utils/css-utils';

export const CardContainer = styled.form`
  width: 80%;
  height: 230px;
  background-color: ${WhiteColor};
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
`;

export const TodoInput = styled.input`
  margin: 5px 0;
  padding: 3px 3px;
`;

export const TodoContainer = styled.ul`
  flex: 1;
  overflow: auto;
  padding-left: 0;
  list-style: none;
`;
