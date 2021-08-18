// Dependencies
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

// Services
import api from '~/services/api';

// Components
import DeleteIngredient from './Modal/Delete/ingredient';
import DeleteUtensil from './Modal/Delete/utensil';
import DeleteStep from './Modal/Delete/step';
import DeleteRecipe from './Modal/Delete/recipe';

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

  const handleClose = () => {
    setModalIndex(0);
    setIngredientId(null);
    setUtensilId(null);
    setStepId(null);

    getRecipe();
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

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <S.Container>
      <DeleteIngredient
        open={!!(modalIndex === 1 && ingredientId)}
        handleClose={handleClose}
        ingredientId={ingredientId}
      />
      <DeleteUtensil
        open={!!(modalIndex === 2 && utensilId)}
        handleClose={handleClose}
        utensilId={utensilId}
      />
      <DeleteStep
        open={!!(modalIndex === 3 && stepId)}
        handleClose={handleClose}
        stepId={stepId}
      />
      <DeleteRecipe
        open={!!(modalIndex === 4 && recipe && recipe.id)}
        handleClose={handleClose}
        recipeId={recipe && recipe.id}
      />

      <RemoveIngredient
        open={!!(modalIndex === 5 && ingredientId)}
        handleClose={handleClose}
        ingredientId={ingredientId}
      />
      <RemoveUtensil
        open={!!(modalIndex === 6 && utensilId)}
        handleClose={handleClose}
        utensilId={utensilId}
      />

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

                  {step.ingredients && step.ingredients[0] && (
                    <S.SubList>
                      <h3>Ingredientes</h3>
                      {step.ingredients.map(ingredient => (
                        <S.SubItem
                          key={ingredient.id}
                          grid="200px 100px auto 30px"
                        >
                          <strong>
                            {ingredient.name}
                            {ingredient.opcional && ' (opcional)'}
                          </strong>
                          <strong>{ingredient.quantity}</strong>
                          <strong>R$ {ingredient.cost}</strong>
                          <button
                            type="button"
                            onClick={() => {
                              setIngredientId(ingredient.id);
                              setModalIndex(5);
                            }}
                          >
                            <S.IconSubDelete />
                          </button>
                        </S.SubItem>
                      ))}
                    </S.SubList>
                  )}

                  {step.utensils && step.utensils[0] && (
                    <S.SubList>
                      <h3>Utensílios</h3>
                      {step.utensils.map(utensil => (
                        <S.SubItem key={utensil.id} grid="auto 30px">
                          <strong>
                            {utensil.name}
                            {utensil.opcional && ' (opcional)'}
                          </strong>

                          <button
                            type="button"
                            onClick={() => {
                              setUtensilId(utensil.id);
                              setModalIndex(6);
                            }}
                          >
                            <S.IconSubDelete />
                          </button>
                        </S.SubItem>
                      ))}
                    </S.SubList>
                  )}
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
