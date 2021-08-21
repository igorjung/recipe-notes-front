// Dependencies
import React from 'react';

// Services
import history from '~/services/history';

// Styles
import * as S from './styles';
import * as I from '~/styles/icons';

export default function Home() {
  return (
    <S.Container>
      <h1>Adicionar nova receita</h1>
      <button type="button" onClick={() => history.push('/recipes/add')}>
        <I.IconAdd size={50} />
      </button>
    </S.Container>
  );
}
