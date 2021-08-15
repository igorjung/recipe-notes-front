// Dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Styles
import * as S from './styles';

export default function Sidebar() {
  // States from Redux
  const user = useSelector(state => state.user.profile);

  return (
    <S.Wrapper>
      <S.Container>
        <S.Logo>
          <strong>Recipe</strong>
          <p>Notes</p>
        </S.Logo>
        <S.User to="/profile">
          <S.IconPerson />
          <h3>{user.name}</h3>
        </S.User>
        <S.List>
          <header>
            <S.IconBook />
            <h3>Minhas Receitas</h3>
            <hr />
          </header>
          <S.Item>
            <S.IconPizza />
            <strong>Pizza Caseira</strong>
          </S.Item>
          <S.Item>
            <S.IconPizza />
            <strong>Pizza Caseira</strong>
          </S.Item>
          <S.Item>
            <S.IconPizza />
            <strong>Pizza Caseira</strong>
          </S.Item>
          <S.Item>
            <S.IconPizza />
            <strong>Pizza Caseira</strong>
          </S.Item>
          <S.Item>
            <S.IconPizza />
            <strong>Pizza Caseira</strong>
          </S.Item>
        </S.List>
      </S.Container>
      <S.Filter>
        <button type="button" onClick={() => console.log('$$$$$$$$$')}>
          <S.IconSearch />
        </button>
        <input placeholder="Buscar Receita..." />
      </S.Filter>
    </S.Wrapper>
  );
}
