// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { Wrapper } from './styles';

export default function Default({ size, children }) {
  return <Wrapper>{children}</Wrapper>;
}

// Props
Default.propTypes = {
  size: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};
