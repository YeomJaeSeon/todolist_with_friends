import styled from 'styled-components';

export const TodoList = styled.li``;

type CheckPropType = {
  check: boolean;
};
export const TodoText = styled.span<CheckPropType>`
  text-decoration: ${(props) => (props.check ? 'line-through' : 'none')};
  opacity: ${(props) => (props.check ? '0.5' : '1')};
`;
