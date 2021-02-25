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
`;

export const ModalTitle = styled.h1`
  font-size: 1.2rem;
`;

export const ModalUserSection = styled.div`
  background-color: gray;
  width: 100%;
  height: 100%;
  display: flex;
`;

export const ModalSelectorSection = styled.div`
  position: relative;
  flex: 1;
`;
export const ModalUserBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
`;
export const ChangeSection = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChangeCharacterInput = styled.input`
  width: 80%;
  padding: 3px;
`;

export const CheckBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
`;
