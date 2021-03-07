import { mobileQuery, StrongMainColor, WhiteColor } from 'src/utils/css-utils';
import styled from 'styled-components';

export const ModalWrapper = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

export const ModalOverlay = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

export const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 450px;
  max-width: 560px;
  height: 250px;
  max-height: 300px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobileQuery} {
    width: 300px;
  }
`;

export const ModalTitle = styled.h1`
  font-size: 1.2rem;
`;

export const ModalUserSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const ModalSelectorSection = styled.div`
  position: relative;
  flex: 1;
`;
export const ModalUserBtn = styled.button<{ btnType: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 5px 10px;
  background-color: transparent;
  border: 2px
    ${(props) => (props.btnType === 'change' ? StrongMainColor : 'red')} solid;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: bolder;
  color: ${(props) => (props.btnType === 'change' ? StrongMainColor : 'red')};
  outline: none;
  &:hover {
    background-color: ${(props) =>
      props.btnType === 'change' ? StrongMainColor : 'red'};
    color: ${WhiteColor};
  }
  transition: all 300ms ease;
`;
export const ChangeSection = styled.div<{ isChange: boolean }>`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: ${(props) => (props.isChange ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

export const ChangeCharacterInput = styled.input`
  width: 80%;
  padding: 5px;
  border: 1px solid gray;
  outline: none;
  border-radius: 5px;
`;

export const CheckBtn = styled.button`
  position: absolute;
  right: -15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  outline: none;
`;
