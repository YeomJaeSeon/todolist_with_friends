import React from 'react';
import { Container, CancelIcon } from './CloseButton.style';

type PropType = {
  onClick: () => void;
};

const CloseButton: React.FC<PropType> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <CancelIcon />
    </Container>
  );
};

export default CloseButton;
