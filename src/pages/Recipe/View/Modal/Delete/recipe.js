// Dependencies
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// Services
import api from '~/services/api';
import history from '~/services/history';

// Components
import Button from '~/components/Button';

// Styles
import * as S from '../styles';
import * as I from '~/styles/icons';

// Color Schema
import colors from '~styles/colors';

export default function DeleteRecipe({
  open,
  handleClose,
  handleRefresh,
  recipeId,
}) {
  // States
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRecipe = async () => {
    setLoading(true);
    setRecipe(null);

    try {
      const response = await api.get(`/recipes/${recipeId}`);
      setRecipe(response.data);
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }

    setLoading(false);
  };

  const deleteRecipe = async () => {
    setLoading(true);

    try {
      await api.delete(`/recipes/${recipeId}`);
      handleRefresh();
      history.push('/');
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
    if (open && recipeId) {
      getRecipe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, recipeId]);

  return (
    <S.Container
      isOpen={open}
      contentLabel="DeleteRecipe"
      ariaHideApp={false}
      // onAfterOpen={scrollToBottom}
    >
      <S.Content>
        {recipe ? (
          <>
            <S.Header>
              <h2>{recipe.name}</h2>
              <button type="button" onClick={handleClose}>
                <I.IconClose size={24} />
              </button>
            </S.Header>
            <S.Body>
              <S.Section>
                <strong>Tem certeza que deseja deletar essa receita?</strong>
              </S.Section>
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
                onClick={deleteRecipe}
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
DeleteRecipe.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  recipeId: PropTypes.number,
};

// Default Props
DeleteRecipe.defaultProps = {
  open: false,
  recipeId: null,
};
