// Dependencies
import React from 'react';

// Services
import history from '~/services/history';

// Styles
import * as S from './styles';

export default function Games() {
  return (
    <S.Container>
      <h1>Adicionar nova receita</h1>
      <button type="button" onClick={() => history.push('/recipes/add')}>
        <S.IconAdd />
      </button>
    </S.Container>
  );
}
