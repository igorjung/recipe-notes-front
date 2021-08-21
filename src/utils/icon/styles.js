import styled from 'styled-components';

// Icons
import {
  LunchDining,
  Icecream,
  DinnerDining,
  FoodBank,
} from '@styled-icons/material';

// Color Schema
import colors from '~/styles/colors';

export const IconSnack = styled(LunchDining)`
  color: ${colors.secondary};
  width: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-width: 990px) {
    width: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconDessert = styled(Icecream)`
  color: ${colors.secondary};
  width: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-width: 990px) {
    width: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconLunch = styled(DinnerDining)`
  color: ${colors.secondary};
  width: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-width: 990px) {
    width: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconOther = styled(FoodBank)`
  color: ${colors.secondary};
  width: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-width: 990px) {
    width: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;
