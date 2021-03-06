import React, { useState } from 'react';
import {
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalTitle,
  ModalUserSection,
  ModalSelectorSection,
  ModalUserBtn,
  ChangeSection,
  ChangeCharacterInput,
  CheckBtn,
} from './Modal.style';
import CloseButton from './CloseButton';
import { DatabaseType } from 'src/services/data_service';
import { AuthServiceType } from 'src/services/auth_service';
import { CookieSetOptions } from 'universal-cookie';

type PropType = {
  visible: boolean;
  className: string;
  onClose: () => void;
  closable: boolean;
  uid: string | null;
  databaseService: DatabaseType;
  authService: AuthServiceType;
  notAuthorize: () => void;
  removeCookie: (name: string, options?: CookieSetOptions | undefined) => void;
};

const Modal: React.FC<PropType> = ({
  visible,
  className,
  onClose,
  closable,
  children,
  uid,
  databaseService,
  authService,
  notAuthorize,
  removeCookie,
}) => {
  const [characterChange, setCharacterChange] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const onMaskClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | null
  ) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const close = () => {
    if (onClose) {
      onClose();
    }
  };

  const changeCharacterClick = () => {
    setCharacterChange((characterChange) => !characterChange);
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 6) return;
    setNewUserName(e.target.value);
  };
  const completeChange = () => {
    if (!newUserName) {
      alert('수정할 이름 입력해주세요.');
      return;
    }
    databaseService.changeCharacterName(uid, newUserName);
    onClose();
  };

  const deleteUser = () => {
    const userResponse = window.confirm(
      '다시는 복구할수 없습니다. 정말 삭제하시겠습니까?'
    );
    if (!userResponse) return;
    onClose();
    notAuthorize();
    authService.delete();
    removeCookie('login');

    databaseService.timeSync(uid)();

    databaseService.getLoginUserData(uid)();
    databaseService.getUserDatas()();

    databaseService.deleteUserInfo(uid);
    databaseService.deleteUserData(uid);

    alert('탈퇴 완료되었습니다.');
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        onClick={onMaskClick}
        className={className}
        tabIndex={-1}
        visible={visible}
      >
        <ModalInner tabIndex={0} className="modal-inner">
          {closable && <CloseButton onClick={close} />}
          <ModalTitle>{children}</ModalTitle>
          <ModalUserSection>
            <ModalSelectorSection>
              <ModalUserBtn btnType="change" onClick={changeCharacterClick}>
                별명 수정
              </ModalUserBtn>
              <ChangeSection isChange={characterChange}>
                <ChangeCharacterInput
                  type="text"
                  placeholder="수정할 별명 입력해주세요"
                  value={newUserName}
                  onChange={changeName}
                />
                <CheckBtn onClick={completeChange}>✔</CheckBtn>
              </ChangeSection>
            </ModalSelectorSection>
            <ModalSelectorSection>
              <ModalUserBtn btnType="delete" onClick={deleteUser}>
                회원 탈퇴
              </ModalUserBtn>
            </ModalSelectorSection>
          </ModalUserSection>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

Modal.defaultProps = {
  closable: true,
  visible: false,
};

export default Modal;
