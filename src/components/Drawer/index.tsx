import React from 'react';
import { Container } from './styles';

interface DrawerProps {
  show: boolean;
}

const Drawer: React.FC<DrawerProps> = ({ show = false }: DrawerProps) => {
  return (
    <Container show={show}>
      <ul>
        <li>Cadastro</li>
      </ul>
    </Container>
  );
};

export default Drawer;
