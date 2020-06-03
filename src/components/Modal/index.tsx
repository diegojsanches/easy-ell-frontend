import React from 'react';
import { FiX } from 'react-icons/fi';
import { Container, Content, Title } from './styles';

interface ModalProps {
  show: boolean;
  title: string;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  show = false,
  title,
  onClose,
  children,
}) => {
  return (
    <Container show={show}>
      <Content>
        <Title>
          <h1>{title}</h1>
          <FiX size={30} onClick={onClose} />
        </Title>
        {children}
      </Content>
    </Container>
  );
};

export default Modal;
