import styled from 'styled-components';

export const MainContainer = styled.div`
  flex-basis: 100%;
  height: 100%;
  display: flex;
`;

export const ListContainer = styled.ul`
  flex: 1 1 20%;
  background-color: gray;
  margin: 0;
  padding-left: 0;
`;

export const ContentContainer = styled.div`
  flex: 1 1 80%;
  background-color: orange;
  position: relative;
`;

export const LogoutBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;
