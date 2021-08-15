// Dependencies
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Services
import api from '~/services/api';

// Styles
import * as S from './styles';

// Color Schema
import colors from '~styles/colors';

export default function Sidebar({ handleClose }) {
  // States from Redux
  const profile = useSelector(state => state.user.profile);

  // States
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

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

  const getRecipes = async () => {
    const { id } = profile;
    setLoading(true);

    try {
      const name = query ? `&name=${query}` : '';
      const response = await api.get(`/recipes?user_id=${id}${name}`);
      setRecipes(response.data);
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
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <S.Wrapper>
      <S.Container>
        <S.Header>
          <S.Logo to="/">
            <strong>Recipe</strong>
            <p>Notes</p>
          </S.Logo>
          <button type="button" onClick={handleClose}>
            <S.IconMenu />
          </button>
        </S.Header>

        <S.User to="/profile">
          <S.IconPerson />
          <h3>{profile.name}</h3>
        </S.User>
        <S.List>
          <header>
            <S.IconBook />
            <h3>Minhas Receitas</h3>
            <hr />
          </header>
          {loading ? (
            <ReactLoading
              type="spin"
              color={colors.secondary}
              height={20}
              width={20}
            />
          ) : (
            <>
              {recipes &&
                recipes.map(recipe => (
                  <S.Item key={recipe.id} to={`/recipes/${recipe.id}`}>
                    {Icon(recipe.category)}
                    <strong>{recipe.name}</strong>
                  </S.Item>
                ))}
            </>
          )}
        </S.List>
      </S.Container>
      <S.Filter>
        <button type="button" onClick={getRecipes}>
          <S.IconSearch />
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
};
