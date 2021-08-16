// Dependencies
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

// Services
import history from '~/services/history';
import api from '~/services/api';

// Components
import Button from '~/components/Button';

// Styles
import * as S from './styles';

// Color Schema
import colors from '~/styles/colors';

export default function Recipe() {
  const { id } = useParams();

  // States
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const Icon = category => {
    switch (category) {
      case 'Lanche':
        return <S.IconSnack />;

      case 'Refeição':
        return <S.IconLunch />;

      case 'Sobremesa':
        return <S.IconDessert />;

      default:
        return <S.IconOther />;
    }
  };

  const getRecipe = async () => {
    setLoading(true);

    try {
      const response = await api.get(`/recipes/${id}`);
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
      await api.delete(`/recipes/${id}`);
      history.goBack();
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
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <S.Container>
      <S.Header>
        {loading || !recipe ? (
          <ReactLoading
            type="spin"
            color={colors.secondary}
            height={20}
            width={20}
          />
        ) : (
          <>
            <S.Title>
              {Icon(recipe.category)}
              <h1>{recipe.name}</h1>
            </S.Title>
            {recipe.description && (
              <S.Description>
                <p>{recipe.description}</p>
              </S.Description>
            )}
          </>
        )}
      </S.Header>

      {recipe && (
        <S.Body>
          <S.List>
            <header>
              <S.IconIngredient />
              <h2>Ingredientes</h2>
            </header>
          </S.List>
          <S.List>
            <header>
              <S.IconUtensil />
              <h2>Utensílios</h2>
            </header>
          </S.List>
          <S.List>
            <header>
              <S.IconStep />
              <h2>Etapas</h2>
            </header>
          </S.List>
        </S.Body>
      )}

      {recipe && !loading && (
        <S.Footer>
          <Button
            type="button"
            background="#ddd"
            color="#666"
            loading={false}
            onClick={() => history.goBack()}
          >
            <strong>Voltar</strong>
          </Button>

          <Button
            loading={false}
            background={colors.warning}
            color="#fff"
            type="button"
            onClick={deleteRecipe}
          >
            <strong>Deletar</strong>
          </Button>
        </S.Footer>
      )}
    </S.Container>
  );
}
