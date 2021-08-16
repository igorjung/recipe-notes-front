import styled from 'styled-components';

// Icons
import { Book } from 'styled-icons/boxicons-regular';
import { Bowl } from 'styled-icons/entypo';
import { AppleAlt } from 'styled-icons/fa-solid';
import {
  FoodEgg,
  Food,
  FoodCake,
  FoodPizza,
} from 'styled-icons/fluentui-system-filled';

// Color Schema
import colors from '~/styles/colors';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Header = styled.header`
  width: 100%;
  margin-bottom: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Body = styled.div`
  height: 100%;
  width: 100%;
  margin-bottom: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const List = styled.ul`
  width: 100%;
  padding: 0 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  & + ul {
    margin-top: 32px;
  }

  header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    h2 {
      margin-left: 8px;
    }
  }
`;

export const Footer = styled.footer`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  width: 100%;
  margin-bottom: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  h1 {
    font-size: 24px;
    margin-left: 16px;
    color: ${colors.secondary};
  }
`;

export const Description = styled.div`
  width: 100%;
  padding: 16px 32px;
  border-radius: 5px;

  background: ${colors.primary};
`;

export const IconIngredient = styled(AppleAlt)`
  color: ${colors.secondary};
  width: 18px;

  @media (max-width: 990px) {
    width: 16px;
  }
`;

export const IconUtensil = styled(Bowl)`
  color: ${colors.secondary};
  width: 20px;

  @media (max-width: 990px) {
    width: 40px;
  }
`;

export const IconStep = styled(Book)`
  color: ${colors.secondary};
  width: 20px;

  @media (max-width: 990px) {
    width: 40px;
  }
`;

export const IconSnack = styled(FoodEgg)`
  color: ${colors.secondary};
  width: 24px;

  @media (max-width: 990px) {
    width: 16px;
  }
`;

export const IconLunch = styled(Food)`
  color: ${colors.secondary};
  width: 24px;

  @media (max-width: 990px) {
    width: 16px;
  }
`;

export const IconDessert = styled(FoodCake)`
  color: ${colors.secondary};
  width: 24px;

  @media (max-width: 990px) {
    width: 16px;
  }
`;

export const IconOther = styled(FoodPizza)`
  color: ${colors.secondary};
  width: 24px;

  @media (max-width: 990px) {
    width: 16px;
  }
`;
