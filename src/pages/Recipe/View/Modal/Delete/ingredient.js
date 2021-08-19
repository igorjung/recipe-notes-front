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

export default function DeleteIngredient({
  open,
  handleClose,
  handleRefresh,
  ingredientId,
}) {
  // States
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(false);

  const getIgredient = async () => {
    setLoading(true);
    setIngredient(null);

    try {
      const response = await api.get(`/ingredients/${ingredientId}`);
      setIngredient(response.data);
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }

    setLoading(false);
  };

  const deleteIngredient = async () => {
    setLoading(true);

    try {
      await api.delete(`/ingredients/${ingredientId}`);
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
    if (open && ingredientId) {
      getIgredient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ingredientId]);

  return (
    <S.Container
      isOpen={open}
      contentLabel="DeleteIngredient"
      ariaHideApp={false}
      // onAfterOpen={scrollToBottom}
    >
      <S.Content>
        {ingredient ? (
          <>
            <S.Header>
              <h2>{ingredient.name}</h2>
              <button type="button" onClick={handleRefresh}>
                <S.IconClose />
              </button>
            </S.Header>
            <S.Body>
              <strong>Tem certeza que deseja deletar o ingrediente?</strong>
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
                onClick={deleteIngredient}
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
DeleteIngredient.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  ingredientId: PropTypes.number,
};

// Default Props
DeleteIngredient.defaultProps = {
  open: false,
  ingredientId: null,
};
