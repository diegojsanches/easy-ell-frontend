import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="easy$ell" />
      <div>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/produto">Produtos</Link>
          <Link to="/venda">Venda</Link>
        </nav>
        <div>
          <strong>Jonh Joe</strong>
          <small>Gerente</small>
        </div>
      </div>
    </header>
  </Container>
);

export default Header;
