// Dependencies
import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

// Styles
import { ButtonStyled } from './styles';

export default function Button({
  loading,
  background,
  color,
  children,
  type,
  ...buttonProps
}) {
  return (
    <ButtonStyled
      disabled={loading}
      type={type}
      color={color}
      background={background}
      {...buttonProps}
    >
      {loading ? (
        <ReactLoading type="spin" color="#fff" height={20} width={20} />
      ) : (
        <>{children}</>
      )}
    </ButtonStyled>
  );
}

// Props
Button.propTypes = {
  loading: PropTypes.bool.isRequired,
  background: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  type: PropTypes.string.isRequired,
};
