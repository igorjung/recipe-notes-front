// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Styles
import * as S from './styles';

// Components
import Sidebar from '~/components/Sidebar';

export default function Private({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <S.Wrapper>
      {open ? (
        <Sidebar handleClose={() => setOpen(false)} />
      ) : (
        <S.Button type="button" onClick={() => setOpen(true)}>
          <S.IconMenu />
        </S.Button>
      )}
      {children}
    </S.Wrapper>
  );
}

// Props
Private.propTypes = {
  children: PropTypes.element.isRequired,
};
