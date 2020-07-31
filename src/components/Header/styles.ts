import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #ffc93c;
  padding: 30px 0;

  header {
    max-width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 120px')};

    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      justify-content: center;

      nav {
        display: flex;
        align-items: center;
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

      input {
        display: none;

        &:checked ~ nav {
          display: flex;
        }

        &:checked ~ label div span {
          transform: rotate(45deg);
        }

        &:checked ~ label div span:before {
          transform: rotate(90deg);
          top: 0;
        }

        &:checked ~ label div span:after {
          transform: rotate(90deg);
          bottom: 0;
        }
      }

      label {
        display: none;
        div {
          width: 60px;
          height: 60px;
          /* position: fixed;
          top: 25px;
          right: 25px; */

          span {
            content: '';
            position: relative;
            display: block;
            background: #155263;
            width: 30px;
            height: 2px;
            top: 2px;
            left: 15px;
            transition: 0.5s ease-in-out;
          }

          span::before,
          span::after {
            background: #155263;
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            transition: 0.5s ease-in-out;
          }

          span::before {
            top: 8px;
          }

          span::after {
            bottom: 8px;
          }
        }
      }
      @media (max-width: 700px) {
        flex-direction: column;
        position: relative;

        nav {
          display: none;
          position: absolute;
          align-items: flex-end;
          flex-direction: column;
          background: #ffc93c;
          top: 60px;
          right: -2px;
          padding: 12px;
          box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

          a {
            width: 100%;
            padding: 8px;
            border-bottom: 1px dashed #155263;
          }

          div {
            padding: 8px;
          }
        }

        label {
          display: block;
        }
      }
    }
  }
`;
