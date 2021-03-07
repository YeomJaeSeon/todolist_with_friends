import { mobileQuery } from 'src/utils/css-utils';
import styled from 'styled-components';
import { ReactComponent as CrownSVG } from '../../assets/svg/crown-solid.svg';

export const RankingContainer = styled.div`
  background-color: #e0e0e0;
  flex: 1;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const RankingTitle = styled.h1`
  font-size: 50px;
  margin: 20px 0;
`;

export const UserList = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CrwonIcon = styled(CrownSVG)`
  margin-right: 20px;
  width: 30px;
  height: 30px;
`;

export const NoRankerUser = styled.div`
  display: inline-block;
  margin-right: 20px;
  width: 30px;
  height: 30px;
`;

export const User = styled.li<{ rank: number }>`
  font-size: 1.5rem;
  width: 80%;
  padding: 10px 0;
  display: flex;
  background: ${(props) => {
    if (props.rank === 0) {
      return 'rgb(224,27,27) linear-gradient(90deg, rgba(224,27,27,1) 0%, rgba(255,183,0,1) 100%)';
    } else if (props.rank === 1) {
      return 'rgb(36,27,224) linear-gradient(90deg, rgba(36,27,224,1) 0%, rgba(175,176,192,1) 100%)';
    } else if (props.rank === 2) {
      return 'rgb(175,192,177) linear-gradient(90deg, rgba(175,192,177,1) 15%, rgba(240,163,7,1) 100%)';
    } else return 'gray';
  }};
  margin: 10px 0;
  border-radius: 10px;

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
  padding-left: 50px;
  flex-basis: 60%;
`;

export const RankTIme = styled.span`
  flex: 1;
`;
