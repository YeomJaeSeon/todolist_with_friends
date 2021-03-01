import { mobileQuery } from 'src/utils/css-utils';
import styled from 'styled-components';
import { ReactComponent as CrownSVG } from '../../assets/svg/crown-solid.svg';

export const RankingContainer = styled.div`
  flex: 1;
  color: black;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  padding-top: 50px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;

    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  ${mobileQuery} {
    text-align: center;
    width: 100%;
    padding: 0;
  }
`;

export const RankingTitle = styled.h1``;

export const UserList = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 100%;
`;

export const CrwonIcon = styled(CrownSVG)`
  width: 15px;
  height: 15px;
`;

export const NoRankerUser = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
`;

export const User = styled.li<{ rank: number }>`
  font-size: 0.9rem;
  padding: 10px 0;
  display: flex;

  ${CrwonIcon} {
    color: ${(props) => {
      if (props.rank === 0) {
        return 'gold';
      } else if (props.rank === 1) {
        return 'silver';
      } else if (props.rank === 2) {
        return '#4b2c20';
      }
    }};
  }
  ${mobileQuery} {
    font-size: 1.2rem;
  }
`;

export const RankNum = styled.span`
  margin-left: 20px;
  flex-basis: 15%;
`;

export const RankName = styled.span`
  display: flex;
  align-items: center;
  flex-basis: 50%;
`;

export const RankTIme = styled.span`
  flex-basis: 35%;
`;
