import styled from 'styled-components';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #000;
  color: #fff;
  position: fixed;
  width: ${({ show }) => (show ? '250px' : '0')};
  min-height: 100%;
  top: 0;
  right: 0;
  transition: 0.5s;

  li {
    list-style: none;
  }
`;
