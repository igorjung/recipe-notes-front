// Dependencies
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import useOnclickOutside from 'react-cool-onclickoutside';
import { toast } from 'react-toastify';

// Services
import api from '~/services/api';

// Components
import Button from '~/components/Button';

// Styles
import * as S from '../styles';

// Color Schema
import colors from '~styles/colors';

export default function RemoveIngredient({ open, handleClose, ingredientId }) {
  // States
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ref
  const ref = useOnclickOutside(() => {
    handleClose();
  });

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

  const removeIngredient = async () => {
    setLoading(true);

    try {
      await api.put(`/ingredients/${ingredientId}`, {
        ...ingredient,
        step_id: null,
      });
      handleClose();
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
      contentLabel="RemoveIngredient"
      ariaHideApp={false}
      // onAfterOpen={scrollToBottom}
    >
      <S.Content ref={ref}>
        {ingredient ? (
          <>
            <S.Header>
              <h2>{ingredient.name}</h2>
              <button type="button" onClick={handleClose}>
                <S.IconClose />
              </button>
            </S.Header>
            <S.Body>
              <strong>Tem certeza que deseja remover o ingrediente?</strong>
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
                onClick={removeIngredient}
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
RemoveIngredient.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  ingredientId: PropTypes.number,
};

// Default Props
RemoveIngredient.defaultProps = {
  open: false,
  ingredientId: null,
};
