import styled from 'styled-components';
import { WhiteColor } from '../../utils/css-utils';

export const InputCardContainer = styled.form`
  width: 70%;
  height: 230px;
  background-color: ${WhiteColor};
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const TodoListContainer = styled.ul`
  flex: 1;
  overflow: scroll;
  padding-left: 0;
  list-style: none;
`;
