// Dependencies
import React from 'react';

// Styles
import * as S from './styles';

// Color Schema

export default function Icon(category, size = null) {
  switch (category) {
    case 'Lanche':
      return <S.IconSnack size={size} />;

    case 'Refeição':
      return <S.IconLunch size={size} />;

    case 'Sobremesa':
      return <S.IconDessert size={size} />;

    default:
      return <S.IconOther size={size} />;
  }
}
