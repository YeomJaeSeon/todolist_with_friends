import React from 'react';
import * as S from './CloseButton.style';

type PropType = {
  onClick: () => void;
};

const CloseButton: React.FC<PropType> = ({ onClick }) => {
  return <S.CloseButton onClick={onClick}>X</S.CloseButton>;
};

export default CloseButton;
