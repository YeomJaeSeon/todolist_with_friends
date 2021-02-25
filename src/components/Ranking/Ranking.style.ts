import styled from 'styled-components';
import { ReactComponent as CrownSVG } from '../../assets/svg/crown-solid.svg';

export const RankingContainer = styled.div`
  flex: 1;
  border-radius: 5px;
  background-color: #c8e6c9;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  &::-webkit-scrollbar {
    /* 세로 스크롤 넓이 */
    width: 8px;

    /* 가로 스크롤 높이 */
    height: 8px;

    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

export const RankingTitle = styled.h1``;

export const UserList = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 100%;
`;

export const CrwonIcon = styled(CrownSVG)``;

export const rankNum = styled.span`
  margin-left: 10px;
  flex-basis: 20%;
`;

export const rankName = styled.span`
  flex-basis: 45%;
`;
export const User = styled.li<{ rank: number }>`
  font-size: 0.9rem;
  padding: 10px 0;
  display: flex;
  ${rankName} {
    color: ${(props) => {
      if (props.rank === 0) {
        return 'red';
      } else if (props.rank === 1) {
        return 'blue';
      } else if (props.rank === 2) {
        return 'yellow';
      }
    }};
  }
`;

export const rankTIme = styled.span`
  flex-basis: 35%;
`;
