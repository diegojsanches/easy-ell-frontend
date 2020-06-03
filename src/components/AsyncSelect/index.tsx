import { IconBaseProps } from 'react-icons/lib/cjs';

import { FiAlertCircle } from 'react-icons/fi';

import React, { useRef, useEffect } from 'react';
import { OptionTypeBase } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface Props extends AsyncProps<OptionTypeBase> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}
const AsyncSelect: React.FC<Props> = ({ name, icon: Icon, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      // path: 'select.state.value',
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
    <Container isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <Select
        cacheOptions
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
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
