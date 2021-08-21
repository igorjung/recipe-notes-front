// Dependencies
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { fetchRecipesRequest } from '~/store/modules/recipe/actions';
import { signOut } from '~/store/modules/auth/actions';

// Utils
import icon from '~/utils/icon';

// Styles
import * as S from './styles';
import * as I from '~/styles/icons';

// Color Schema
import colors from '~/styles/colors';

export default function Sidebar({ handleClose, handleClick }) {
  const dispatch = useDispatch();

  // States from Redux
  const profile = useSelector(state => state.user.profile);
  const { recipes, loading } = useSelector(state => state.recipe);

  // States
  const [query, setQuery] = useState('');

  const getRecipes = async () => {
    const { id } = profile;

    const dataQuery = query ? `?user_id=${id}&name=${query}` : `?user_id=${id}`;
    dispatch(fetchRecipesRequest(dataQuery));
  };

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <S.Wrapper>
      <S.Container>
        <S.Header>
          <S.Logo to="/" onClick={handleClick}>
            <strong>Recipe</strong>
            <p>Notes</p>
          </S.Logo>
          <button type="button" onClick={handleClose}>
            <I.IconMenu size={22} />
          </button>
        </S.Header>

        <S.User to="/profile" onClick={handleClick}>
          <I.IconPerson size={22} />
          <h3>{profile.name}</h3>
        </S.User>
        <S.List>
          <header>
            <I.IconRecipes size={22} />
            <h3>Minhas Receitas</h3>
            <hr />
          </header>
          {loading ? (
            <section>
              <ReactLoading
                type="spin"
                color={colors.secondary}
                height={20}
                width={20}
              />
            </section>
          ) : (
            <section>
              {recipes &&
                recipes.map(recipe => (
                  <S.Item
                    key={recipe.id}
                    to={`/recipes/${recipe.id}`}
                    onClick={handleClick}
                  >
                    {icon(recipe.category, 18)}
                    <strong>{recipe.name}</strong>
                  </S.Item>
                ))}
            </section>
          )}
        </S.List>

        <S.List>
          <S.Item to="/recipes/add" onClick={handleClick}>
            <I.IconAdd size={22} />

            <strong>Adicionar Receita</strong>
          </S.Item>
          <button type="button" onClick={() => dispatch(signOut())}>
            <I.IconLogout size={22} />
            <strong>Sair</strong>
          </button>
        </S.List>
      </S.Container>
      <S.Filter>
        <button type="button" onClick={getRecipes}>
          <I.IconSearch size={24} />
        </button>
        <input
          placeholder="Buscar Receita..."
          onChange={e => setQuery(e.target.value)}
        />
      </S.Filter>
    </S.Wrapper>
  );
}

// Props
Sidebar.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
