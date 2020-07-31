import { IconBaseProps } from 'react-icons/lib/cjs';

import { FiAlertCircle } from 'react-icons/fi';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { OptionTypeBase } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { useField } from '@unform/core';
import { Container, Error, customStyles } from './styles';

interface Props extends AsyncProps<OptionTypeBase> {
  name: string;
  cleanInput?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
}
const AsyncSelect: React.FC<Props> = ({
  name,
  cleanInput = false,
  icon: Icon,
  ...rest
}) => {
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    const ref = selectRef.current as any;
    setIsFocused(false);
    setIsFilled(!!ref?.select?.state?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(
            (option: OptionTypeBase) => option.value,
          );
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      cleanInput={cleanInput}
    >
      {Icon && <Icon size={20} />}
      <Select
        cacheOptions
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        defaultValue={defaultValue}
        styles={customStyles}
        ref={selectRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default AsyncSelect;
