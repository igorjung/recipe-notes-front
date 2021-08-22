// Dependencies
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import ReactTooltip from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

// Redux
import { fetchRecipesRequest } from '~/store/modules/recipe/actions';

// Services
import api from '~/services/api';
import history from '~/services/history';

// Utils
import icon from '~/utils/icon';

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

import Button from '~/components/Button';

// Styles
import * as S from './styles';
import * as I from '~/styles/icons';

// Color Schema
import colors from '~/styles/colors';

export default function Recipe() {
  const dispatch = useDispatch();
  const { id } = useParams();

  // States from Redux
  const profile = useSelector(state => state.user.profile);

  // States
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const [ingredientId, setIngredientId] = useState(null);
  const [utensilId, setUtensilId] = useState(null);
  const [stepId, setStepId] = useState(null);

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

    dispatch(fetchRecipesRequest(`?user_id=${profile.id}`));
  };

  const handleDelete = () => {
    setModalIndex(0);
    setIngredientId(null);
    setUtensilId(null);
    setStepId(null);
    dispatch(fetchRecipesRequest(`?user_id=${profile.id}`));
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
          handleRefresh={handleDelete}
          recipeId={recipe && recipe.id}
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
                {icon(recipe.category, 28)}
                <h1>{recipe.name}</h1>
              </div>
              <button type="button" onClick={() => setModalIndex(13)}>
                <I.IconEdit size={24} />
              </button>
            </S.Title>
            {recipe && (
              <S.Cards>
                <S.Card>
                  <I.IconTime />
                  <strong>{recipe.preparation_time}</strong>
                </S.Card>
                <S.Card>
                  <I.IconCost />
                  <strong>{recipe.financial_cost}</strong>
                </S.Card>
                <S.Card>
                  <I.IconCategory />
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
                  <I.IconIngredient size={24} />
                  <h2>Ingredientes</h2>
                </div>

                <button type="button" onClick={() => setModalIndex(7)}>
                  <I.IconAdd size={24} />
                </button>
              </S.Title>
            </header>
            {recipe.ingredients && recipe.ingredients[0] ? (
              recipe.ingredients.map(ingredient => (
                <S.Item key={ingredient.id} grid="40% 20% 20% 10% 10%">
                  <strong data-tip={ingredient.name}>
                    {`${ingredient.name.substring(0, 25)}${
                      ingredient.name.length >= 25 ? '...' : ''
                    }`}
                    {ingredient.opcional && ' (opcional)'}
                  </strong>
                  <strong data-tip={ingredient.quantity}>
                    {`${ingredient.quantity.substring(0, 25)}${
                      ingredient.quantity.length >= 25 ? '...' : ''
                    }`}
                  </strong>
                  <strong data-tip={ingredient.cost}>
                    {`${ingredient.cost.substring(0, 25)}${
                      ingredient.cost.length >= 25 ? '...' : ''
                    }`}
                  </strong>
                  <button
                    type="button"
                    onClick={() => {
                      setIngredientId(ingredient.id);
                      setModalIndex(10);
                    }}
                  >
                    <I.IconEdit size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIngredientId(ingredient.id);
                      setModalIndex(1);
                    }}
                  >
                    <I.IconDelete size={24} />
                  </button>
                </S.Item>
              ))
            ) : (
              <S.Item grid="auto">
                <strong>Não há igredientes para essa receita.</strong>
              </S.Item>
            )}
            <ReactTooltip type="dark" effect="float" place="bottom" />
          </S.List>
          <S.List>
            <header>
              <S.Title>
                <div>
                  <I.IconUtensil size={24} />
                  <h2>Utensílios</h2>
                </div>
                <button type="button" onClick={() => setModalIndex(8)}>
                  <I.IconAdd size={24} />
                </button>
              </S.Title>
            </header>
            {recipe.utensils && recipe.utensils[0] ? (
              recipe.utensils.map(utensil => (
                <S.Item key={utensil.id} grid="80% 10% 10%">
                  <strong data-tip={utensil.name}>
                    {`${utensil.name.substring(0, 25)}${
                      utensil.name.length >= 25 ? '...' : ''
                    }`}
                    {utensil.opcional && ' (opcional)'}
                  </strong>
                  <button
                    type="button"
                    onClick={() => {
                      setUtensilId(utensil.id);
                      setModalIndex(11);
                    }}
                  >
                    <I.IconEdit size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUtensilId(utensil.id);
                      setModalIndex(2);
                    }}
                  >
                    <I.IconDelete size={24} />
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
                  <I.IconStep size={24} />
                  <h2>Modo de preparo</h2>
                </div>
                <button type="button" onClick={() => setModalIndex(9)}>
                  <I.IconAdd size={24} />
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
                      <I.IconEdit size={24} />
                    </button>
                  </header>

                  <section>
                    <strong>{step.description}</strong>
                  </section>

                  <footer>
                    {step.time && (
                      <div>
                        <I.IconTime size={24} />
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
                      <I.IconDelete size={24} />
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

          <S.Footer>
            <Button
              loading={false}
              background={colors.tertiary}
              color="#333"
              type="button"
              onClick={() => history.push('/')}
            >
              <strong>Voltar</strong>
            </Button>

            <Button
              loading={false}
              background={colors.warning}
              color="#fff"
              type="button"
              onClick={() => setModalIndex(4)}
            >
              <strong>Deletar</strong>
            </Button>
          </S.Footer>
        </S.Body>
      )}
    </S.Container>
  );
}
