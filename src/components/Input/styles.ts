import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  cleanInput: boolean;
}

export const Container = styled.div<ContainerProps>`
  border: 0;
  border: 2px solid #666666;
  border-radius: 6px;
  background: transparent;
  padding: 15px;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${({ cleanInput }) =>
    cleanInput &&
    css`
      border: 0;
      border-radius: 0;
      border-bottom: 2px solid #666666;
      padding: 0;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    display: block;
    width: 100%;
    border: 0;
    background: transparent;
    color: #155263;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
