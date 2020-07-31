import styled, { css } from 'styled-components';
import { CSSProperties } from 'react';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  cleanInput: boolean;
}

export const Container = styled.div<ContainerProps>`
  border: 2px solid #666666;
  border-radius: 8px;
  padding: 8px;

  background: transparent;

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
      color: #ffc93c;
      border-color: #ffc93c;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ffc93c;
    `}

  div {
    border: 0;
    background: #fff;
    color: #155263;
    font-size: 16px;

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

export const customStyles = {
  control: (provided: CSSProperties): any => {
    const cssProperties = {
      ...provided,
      '&:hover': {
        borderColor: 'none',
      },
      border: 'none',
      boxShadow: 'none',
      minHeight: 'auto',
    };
    return cssProperties;
  },
  input: (provided: CSSProperties): any => {
    const cssProperties = {
      ...provided,
      margin: 0,
      flex: 1,
      padding: 0,
    };
    return cssProperties;
  },
  container: (provided: CSSProperties): any => {
    const cssProperties = {
      ...provided,
      width: '100%',
    };
    return cssProperties;
  },
  valueContainer: (provided: CSSProperties): any => {
    const cssProperties = {
      ...provided,
      padding: 0,
    };
    return cssProperties;
  },
  indicatorsContainer: () => ({ display: 'none' }),
};
