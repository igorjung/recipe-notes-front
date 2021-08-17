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
    setRecipe(null);

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

  const deleteIngredient = async ingredient_id => {
    setLoading(true);

    try {
      await api.delete(`/ingredients/${ingredient_id}`);
      getRecipe();
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }

    setLoading(false);
  };

  const deleteUtensil = async utensil_id => {
    setLoading(true);

    try {
      await api.delete(`/utensils/${utensil_id}`);
      getRecipe();
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }

    setLoading(false);
  };

  const deleteStep = async step_id => {
    setLoading(true);

    try {
      await api.delete(`/steps/${step_id}`);
      getRecipe();
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
            {recipe && (
              <S.Cards>
                <S.Card>
                  <S.IconTime />
                  <strong>{recipe.preparation_time}</strong>
                </S.Card>
                <S.Card>
                  <S.IconMoney />
                  <strong>{recipe.financial_cost}</strong>
                </S.Card>
                <S.Card>
                  <S.IconFood />
                  <strong>{recipe.category}</strong>
                </S.Card>
              </S.Cards>
            )}
            {recipe.description && (
              <S.Description>
                <p>{recipe.description}</p>
              </S.Description>
            )}
          </>
        )}
      </S.Header>

      {recipe && !loading && (
        <S.Body>
          <S.List>
            <header>
              <S.IconIngredient />
              <h2>Ingredientes</h2>
            </header>
            {recipe.ingredients && recipe.ingredients[0] ? (
              recipe.ingredients.map(ingredient => (
                <S.Item key={ingredient.id} grid="200px 100px auto 60px">
                  <strong>
                    {ingredient.name}
                    {ingredient.opcional && ' (opcional)'}
                  </strong>
                  <strong>{ingredient.quantity}</strong>
                  <strong>R$ {ingredient.cost}</strong>
                  <button
                    type="button"
                    onClick={() => deleteIngredient(ingredient.id)}
                  >
                    <S.IconDelete />
                  </button>
                </S.Item>
              ))
            ) : (
              <S.Item grid="auto">
                <strong>Não há igredientes para essa receita.</strong>
              </S.Item>
            )}
          </S.List>
          <S.List>
            <header>
              <S.IconUtensil />
              <h2>Utensílios</h2>
            </header>
            {recipe.utensils && recipe.utensils[0] ? (
              recipe.utensils.map(utensil => (
                <S.Item key={utensil.id} grid="auto 60px">
                  <strong>
                    {utensil.name}
                    {utensil.opcional && ' (opcional)'}
                  </strong>

                  <button
                    type="button"
                    onClick={() => deleteUtensil(utensil.id)}
                  >
                    <S.IconDelete />
                  </button>
                </S.Item>
              ))
            ) : (
              <S.Item grid="auto">
                <strong>Não há untensílios para essa receita.</strong>
              </S.Item>
            )}
          </S.List>
          <S.List>
            <header>
              <S.IconStep />
              <h2>Modo de preparo</h2>
            </header>
            {recipe.steps && recipe.steps[0] ? (
              recipe.steps.map((step, index) => (
                <S.Step key={step.id} grid="auto 60px">
                  <header>
                    <h3>{index + 1}</h3>
                    <strong>{step.opcional && 'Opcional'}</strong>
                  </header>

                  <strong>{step.description}</strong>

                  <footer>
                    {step.time && (
                      <div>
                        <S.IconTime />
                        <strong>{step.time}</strong>
                      </div>
                    )}
                    <button type="button" onClick={() => deleteStep(step.id)}>
                      <S.IconDelete />
                    </button>
                  </footer>
                </S.Step>
              ))
            ) : (
              <S.Item grid="auto">
                <strong>Não há etapas para essa receita.</strong>
              </S.Item>
            )}
          </S.List>
        </S.Body>
      )}

      {recipe && !loading && (
        <S.Footer>
          <Button
            type="button"
            background={colors.secondary}
            color="#fff"
            loading={false}
            onClick={() => history.push('/')}
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
