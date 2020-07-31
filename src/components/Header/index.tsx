import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { user, signOut } = useAuth();
  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="easy$ell" />
        <div>
          <input id="menu-icon" type="checkbox" />
          <label htmlFor="menu-icon">
            <div>
              <span />
            </div>
          </label>
          <nav>
            {user.manager && <Link to="/">Início</Link>}
            {user.manager && <Link to="/produto">Produtos</Link>}
            <Link to="/venda">Venda</Link>
            <div>
              <strong onClick={signOut}>{user.name}</strong>
              {user.manager && <small>Gerente</small>}
            </div>
          </nav>
        </div>
      </header>
    </Container>
  );
};

export default Header;
