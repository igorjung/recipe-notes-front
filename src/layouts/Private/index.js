// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Styles
import * as S from './styles';
import * as I from '~/styles/icons';

// Components
import Sidebar from '~/components/Sidebar';

export default function Private({ children, size }) {
  const [open, setOpen] = useState(!!(size > 800));

  const handleClick = () => {
    if (size <= 800) {
      setOpen(false);
    }
  };

  return (
    <S.Wrapper>
      {size <= 800 ? (
        <>
          {open ? (
            <Sidebar
              handleClose={() => setOpen(false)}
              handleClick={handleClick}
            />
          ) : (
            <>
              <S.Button type="button" onClick={() => setOpen(true)}>
                <I.IconMenu />
              </S.Button>
              {children}
            </>
          )}
        </>
      ) : (
        <>
          {open ? (
            <Sidebar
              handleClose={() => setOpen(false)}
              handleClick={handleClick}
            />
          ) : (
            <S.Button type="button" onClick={() => setOpen(true)}>
              <I.IconMenu />
            </S.Button>
          )}
          {children}
        </>
      )}
    </S.Wrapper>
  );
}

// Props
Private.propTypes = {
  children: PropTypes.element.isRequired,
  size: PropTypes.number.isRequired,
};
