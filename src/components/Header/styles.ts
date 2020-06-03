import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #ffc93c;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 120px')};

    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      nav {
        a {
          color: #155263;
          text-decoration: none;
          font-size: 16px;

          & + a {
            margin-left: 26px;
          }

          &:hover {
            opacity: 0.6;
          }
        }
      }

      div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;

        margin-left: 40px;
        strong {
          color: #155263;
          font-size: 16px;
        }

        small {
          color: #155263;
          font-size: 12px;
        }
      }
    }
  }
`;
