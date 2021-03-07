import styled from 'styled-components';
import { mobileQuery, StrongMainColor } from '../../utils/css-utils';
import { ReactComponent as ArrowSVG } from '../../assets/svg/arrow-up-solid.svg';

export const StartPlanContainer = styled.div`
  margin-top: 70px;
  width: 100%;
  flex: 1 1 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
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
    margin: 0;
    flex: 1 1 70%;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

export const ArrowIcon = styled(ArrowSVG)`
  width: 50px;
  height: 55px;
  color: ${StrongMainColor};
  transition: all 300ms ease;
`;

export const ArrowBtn = styled.button<{
  opacityType: 'show' | undefined;
  isVisible: 'show' | undefined;
}>`
  width: 68px;
  height: 67px;
  border-radius: 50%;
  cursor: pointer;
  position: fixed;
  bottom: 30px;
  right: 30px;
  outline: none;
  border: 3px solid ${StrongMainColor};
  opacity: ${(props) => (props.opacityType ? 1 : 0)};
  display: ${(props) => (props.isVisible ? 'inline' : 'none')};
  transition: opacity 600ms ease;
  transition: backgroud-color border 300ms ease;
  &:hover {
    background-color: ${StrongMainColor};
    ${ArrowIcon} {
      color: white;
    }
  }
`;

export const TimerTitle = styled.h1`
  font-size: 50px;
  margin: 20px 0;
`;

export const AllSection = styled.div`
  flex: 1 1 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  background-color: #bdbdbd;
  ${mobileQuery} {
    padding: 0;
    height: 500px;
  }
`;

export const RankingContainer = styled.div`
  width: 100%;
  height: 680px;
  display: flex;
  flex-direction: column;
  ${mobileQuery} {
    margin-top: 50px;
    width: 100%;
    height: 500px;
    overflow-y: auto;
  }
`;
