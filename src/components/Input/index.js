// Dependencies
import React, { useState } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import PropTypes from 'prop-types';

// Styles
import * as S from './styles';
import * as I from '~/styles/icons';

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
        {type ? <I.IconVisible /> : <I.IconHidden />}
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

export function MoneyInput({ name, value, error, ...rest }) {
  // React Hooks
  const defaultMask = {
    prefix: 'R$',
    suffix: '',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2,
    integerLimit: 3,
    allowNegative: false,
    allowLeadingZeroes: false,
    maskOptions: {},
  };
  const mask = createNumberMask(defaultMask);

  return (
    <>
      <MaskedInput
        id={name}
        mask={mask}
        name={name}
        type="text"
        value={value}
        error={error}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

// Props
MoneyInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

// Default Props
MoneyInput.defaultProps = {
  value: '',
  error: '',
};
