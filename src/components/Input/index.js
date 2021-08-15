// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Styles
import * as S from './styles';

export function Password({ name, value, error, ...rest }) {
  const [type, setType] = useState(false);

  return (
    <S.Container>
      <input
        id={name}
        name={name}
        type={type ? 'text' : 'password'}
        value={value}
        error={error}
        {...rest}
      />
      <button type="button" onClick={() => setType(!type)}>
        {type ? <S.IconVisible /> : <S.IconHidden />}
      </button>
    </S.Container>
  );
}

// Props
Password.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

// Default Props
Password.defaultProps = {
  value: '',
  error: '',
};
