// Dependencies
import React from 'react';

// Styles
import * as S from './styles';

export default function Games() {
  return (
    <S.Container>
      <h1>Adicionar nova receita</h1>
      <button type="button" onClick={() => console.log('#######')}>
        <S.IconAdd />
      </button>
    </S.Container>
  );
}
