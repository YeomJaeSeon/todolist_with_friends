import { StrongMainColor, WhiteColor } from 'src/utils/css-utils';
import styled from 'styled-components';

export const CalendarBtn = styled.button`
  font-size: 1.2rem;
  cursor: pointer;
  margin-bottom: 8px;
  background-color: transparent;
  border-radius: 5px;
  border: none;
  outline: none;
  &:hover {
    background-color: ${StrongMainColor};
    color: ${WhiteColor};
  }
  transition: all 300ms ease;
`;
