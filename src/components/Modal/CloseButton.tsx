import React from 'react';
import * as S from './CloseButton.style';

type PropType = {
  onClick: () => void;
};

const CloseButton: React.FC<PropType> = ({ onClick }) => {
  return (
    <S.CloseButton onClick={onClick}>
      <S.CancelIcon />
    </S.CloseButton>
  );
};

export default CloseButton;
