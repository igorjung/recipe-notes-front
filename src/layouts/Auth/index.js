// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { Wrapper } from './styles';

// Components
import Sidebar from '~/components/Sidebar';

export default function Auth({ size, children }) {
  return (
    <Wrapper>
      <Sidebar />
      {children}
    </Wrapper>
  );
}

// Props
Auth.propTypes = {
  size: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};
