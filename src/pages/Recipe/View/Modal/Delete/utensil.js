// Dependencies
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// Services
import api from '~/services/api';

// Components
import Button from '~/components/Button';

// Styles
import * as S from '../styles';

// Color Schema
import colors from '~styles/colors';

export default function DeleteUtensil({
  open,
  handleClose,
  handleRefresh,
  utensilId,
}) {
  // States
  const [utensil, setUtensil] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUtensil = async () => {
    setLoading(true);
    setUtensil(null);

    try {
      const response = await api.get(`/utensils/${utensilId}`);
      setUtensil(response.data);
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }

    setLoading(false);
  };

  const deleteUtensil = async () => {
    setLoading(true);

    try {
      await api.delete(`/utensils/${utensilId}`);
      handleRefresh();
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (open && utensilId) {
      getUtensil();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, utensilId]);

  return (
    <S.Container
      isOpen={open}
      contentLabel="DeleteUtensil"
      ariaHideApp={false}
      // onAfterOpen={scrollToBottom}
    >
      <S.Content>
        {utensil ? (
          <>
            <S.Header>
              <h2>{utensil.name}</h2>
              <button type="button" onClick={handleClose}>
                <S.IconClose />
              </button>
            </S.Header>
            <S.Body>
              <strong>Tem certeza que deseja deletar o utensílio?</strong>
            </S.Body>
            <S.Footer>
              <Button
                type="button"
                background={colors.tertiary}
                color="#333"
                loading={false}
                onClick={handleClose}
              >
                <strong>Cancelar</strong>
              </Button>

              <Button
                loading={loading}
                background={colors.warning}
                color="#fff"
                type="button"
                onClick={deleteUtensil}
              >
                <strong>Confirmar</strong>
              </Button>
            </S.Footer>
          </>
        ) : (
          <ReactLoading
            type="spin"
            color={colors.secondary}
            height={20}
            width={20}
          />
        )}
      </S.Content>
    </S.Container>
  );
}

// Props
DeleteUtensil.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  utensilId: PropTypes.number,
};

// Default Props
DeleteUtensil.defaultProps = {
  open: false,
  utensilId: null,
};
