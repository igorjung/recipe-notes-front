// Dependencies
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

// Services
import api from '~/services/api';

// Components
import CreateIngredient from './Modal/Create/ingredient';
import CreateUtensil from './Modal/Create/utensil';
import CreateStep from './Modal/Create/step';

import DeleteIngredient from './Modal/Delete/ingredient';
import DeleteUtensil from './Modal/Delete/utensil';
import DeleteStep from './Modal/Delete/step';
import DeleteRecipe from './Modal/Delete/recipe';

import UpdateIngredient from './Modal/Update/ingredient';
import UpdateUtensil from './Modal/Update/utensil';
import UpdateStep from './Modal/Update/step';
import UpdateRecipe from './Modal/Update/recipe';

import RemoveIngredient from './Modal/Remove/ingredient';
import RemoveUtensil from './Modal/Remove/utensil';

// Styles
import * as S from './styles';

// Color Schema
import colors from '~/styles/colors';

export default function Recipe() {
  const { id } = useParams();

  // States
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const [ingredientId, setIngredientId] = useState(null);
  const [utensilId, setUtensilId] = useState(null);
  const [stepId, setStepId] = useState(null);

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
    setRecipe(null);
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

  const handleClose = () => {
    setModalIndex(0);
    setIngredientId(null);
    setUtensilId(null);
    setStepId(null);
  };

  const handleRefresh = () => {
    setModalIndex(0);
    setIngredientId(null);
    setUtensilId(null);
    setStepId(null);
    getRecipe();
  };

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <S.Container>
      <>
        <DeleteIngredient
          open={!!(modalIndex === 1 && ingredientId)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          ingredientId={ingredientId}
        />
        <DeleteUtensil
          open={!!(modalIndex === 2 && utensilId)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          utensilId={utensilId}
        />
        <DeleteStep
          open={!!(modalIndex === 3 && stepId)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          stepId={stepId}
        />
        <DeleteRecipe
          open={!!(modalIndex === 4 && recipe && recipe.id)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          recipeId={recipe && recipe.id}
        />

        <RemoveIngredient
          open={!!(modalIndex === 5 && ingredientId)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          ingredientId={ingredientId}
        />
        <RemoveUtensil
          open={!!(modalIndex === 6 && utensilId)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          utensilId={utensilId}
        />

        <CreateIngredient
          open={!!(modalIndex === 7)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          recipeId={recipe && recipe.id}
        />
        <CreateUtensil
          open={!!(modalIndex === 8)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          recipeId={recipe && recipe.id}
        />
        <CreateStep
          open={!!(modalIndex === 9)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          recipeId={recipe && recipe.id}
        />

        <UpdateIngredient
          open={!!(modalIndex === 10 && ingredientId)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          ingredientId={ingredientId}
        />
        <UpdateUtensil
          open={!!(modalIndex === 11 && utensilId)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          utensilId={utensilId}
        />
        <UpdateStep
          open={!!(modalIndex === 12 && stepId)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          stepId={stepId}
        />
        <UpdateRecipe
          open={!!(modalIndex === 13 && recipe && recipe.id)}
          handleClose={handleClose}
          handleRefresh={handleRefresh}
          recipeId={recipe && recipe.id}
        />
      </>

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
              <div>
                {Icon(recipe.category)}
                <h1>{recipe.name}</h1>
              </div>
              <button type="button" onClick={() => setModalIndex(13)}>
                <S.IconEdit />
              </button>
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
              <S.Title>
                <div>
                  <S.IconIngredient />
                  <h2>Ingredientes</h2>
                </div>

                <button type="button" onClick={() => setModalIndex(7)}>
                  <S.IconAdd />
                </button>
              </S.Title>
            </header>
            {recipe.ingredients && recipe.ingredients[0] ? (
              recipe.ingredients.map(ingredient => (
                <S.Item key={ingredient.id} grid="200px 100px auto 30px 30px">
                  <strong>
                    {ingredient.name}
                    {ingredient.opcional && ' (opcional)'}
                  </strong>
                  <strong>{ingredient.quantity}</strong>
                  <strong>{ingredient.cost}</strong>
                  <button
                    type="button"
                    onClick={() => {
                      setIngredientId(ingredient.id);
                      setModalIndex(10);
                    }}
                  >
                    <S.IconEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIngredientId(ingredient.id);
                      setModalIndex(1);
                    }}
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
              <S.Title>
                <div>
                  <S.IconUtensil />
                  <h2>Utensílios</h2>
                </div>
                <button type="button" onClick={() => setModalIndex(8)}>
                  <S.IconAdd />
                </button>
              </S.Title>
            </header>
            {recipe.utensils && recipe.utensils[0] ? (
              recipe.utensils.map(utensil => (
                <S.Item key={utensil.id} grid="auto 30px 30px">
                  <strong>
                    {utensil.name}
                    {utensil.opcional && ' (opcional)'}
                  </strong>
                  <button
                    type="button"
                    onClick={() => {
                      setUtensilId(utensil.id);
                      setModalIndex(11);
                    }}
                  >
                    <S.IconEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUtensilId(utensil.id);
                      setModalIndex(2);
                    }}
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
              <S.Title>
                <div>
                  <S.IconStep />
                  <h2>Modo de preparo</h2>
                </div>
                <button type="button" onClick={() => setModalIndex(9)}>
                  <S.IconAdd />
                </button>
              </S.Title>
            </header>
            {recipe.steps && recipe.steps[0] ? (
              recipe.steps.map((step, index) => (
                <S.Step key={step.id}>
                  <header>
                    <div>
                      <h3>{index + 1}</h3>
                      <strong>{step.opcional && 'Opcional'}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setStepId(step.id);
                        setModalIndex(12);
                      }}
                    >
                      <S.IconEdit />
                    </button>
                  </header>

                  <strong>{step.description}</strong>

                  <footer>
                    {step.time && (
                      <div>
                        <S.IconTime />
                        <strong>{step.time}</strong>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setStepId(step.id);
                        setModalIndex(3);
                      }}
                    >
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
    </S.Container>
  );
}
