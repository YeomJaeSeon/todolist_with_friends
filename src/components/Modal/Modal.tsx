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

  // modal밖부분 클릭->닫힘
  const onMaskClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | null
  ) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  // 모달 닫히는 함수.
  const close = () => {
    if (onClose) {
      onClose();
    }
  };

  // 별명 수정클릭
  const changeCharacterClick = () => {
    setCharacterChange((characterChange) => !characterChange);
  };

  // 별명 수정
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 6) return;
    setNewUserName(e.target.value);
  };
  // 별명수정 적절성 판단함수
  const completeChange = () => {
    if (!newUserName) {
      alert('수정할 이름 입력해주세요.');
      return;
    }
    databaseService.changeCharacterName(uid, newUserName);
    onClose();
  };

  // 유저 삭제, 데이터베이스, 상태 모두적용(회원탈퇴)
  const deleteUser = () => {
    const userResponse = window.confirm(
      '다시는 복구할수 없습니다. 정말 삭제하시겠습니까?'
    );
    if (!userResponse) return;
    onClose();
    // 삭제하는동안 여러 접근을 막기위함
    notAuthorize();
    authService.delete();
    // 쿠키삭제
    removeCookie('login');

    // sync맞추던 데이터베이스와의 연결 끊음
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
