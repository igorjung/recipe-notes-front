import styled from 'styled-components';

// Icons
import { Book, FoodMenu } from 'styled-icons/boxicons-regular';
import { TimeFive } from 'styled-icons/boxicons-solid';
import { Bowl } from 'styled-icons/entypo';
import { AppleAlt, MoneyBillWave } from 'styled-icons/fa-solid';
import {
  FoodEgg,
  Food,
  FoodCake,
  FoodPizza,
  AddSquare,
} from 'styled-icons/fluentui-system-filled';
import { Close } from 'styled-icons/evaicons-solid';
import { Delete } from 'styled-icons/material';
import { DriveFileRenameOutline } from 'styled-icons/material-sharp';

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

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #333;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.secondary};
    border-radius: 30px;
  }
`;

export const Header = styled.header`
  width: 100%;
  margin-bottom: 32px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Cards = styled.ul`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Card = styled.div`
  padding: 8px 16px;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background: ${colors.primary};

  & + div {
    margin-left: 32px;
  }

  strong {
    margin-left: 16px;
  }
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
    justify-content: space-between;
  }
`;

export const Item = styled.li`
  width: 100%;
  padding: 16px 32px;
  border-radius: 5px;
  margin-top: 16px;

  display: grid;
  align-items: center;
  grid-template-columns: ${props => (props.grid ? props.grid : '1fr')};

  background: ${colors.primary};
`;

export const SubList = styled.ul`
  width: 100%;
  margin-top: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  & + ul {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${colors.secondary};
  }

  h3 {
    width: 100%;
    align-items: center;
    justify-content: center;
    color: ${colors.secondary};

    margin-bottom: 16px;
  }
`;

export const SubItem = styled.li`
  width: 100%;
  border-radius: 5px;

  & + li {
    margin-top: 16px;
    border-top: 1px solid ${colors.tertiary};
  }

  display: grid;
  align-items: center;
  grid-template-columns: ${props => (props.grid ? props.grid : '1fr')};

  background: ${colors.primary};
`;

export const Step = styled.li`
  width: 100%;
  padding: 32px;
  border-radius: 5px;
  margin-top: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background: ${colors.primary};

  header {
    width: 100%;
    padding-bottom: 16px;
    margin-bottom: 32px;
    border-bottom: 1px solid ${colors.secondary};

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    h3 {
      font-size: 22px;
      color: ${colors.secondary};
    }
  }

  footer {
    width: 100%;
    padding-top: 16px;
    margin-top: 32px;
    border-top: 1px solid ${colors.secondary};

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      strong {
        margin-left: 8px;
      }
    }
  }
`;

export const Footer = styled.footer`
  width: 100%;
  margin-top: 1000px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  h1 {
    font-size: 24px;
    margin-left: 16px;
    color: ${colors.secondary};
  }

  h2 {
    margin-left: 16px;
  }
`;

export const Description = styled.div`
  width: 100%;
  padding: 16px 32px;
  border-radius: 5px;

  background: ${colors.primary};
`;

export const IconTime = styled(TimeFive)`
  color: ${colors.secondary};
  width: 16px;

  @media (max-width: 990px) {
    width: 16px;
  }
`;

export const IconMoney = styled(MoneyBillWave)`
  color: ${colors.secondary};
  width: 16px;

  @media (max-width: 990px) {
    width: 16px;
  }
`;

export const IconFood = styled(FoodMenu)`
  color: ${colors.secondary};
  width: 16px;

  @media (max-width: 990px) {
    width: 18px;
  }
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

export const IconDelete = styled(Delete)`
  color: ${colors.warning};
  width: 22px;

  @media (max-width: 990px) {
    width: 18px;
  }
`;

export const IconEdit = styled(DriveFileRenameOutline)`
  color: ${colors.secondary};
  width: 22px;

  @media (max-width: 990px) {
    width: 18px;
  }
`;

export const IconSubDelete = styled(Close)`
  color: #fff;
  width: 28px;

  @media (max-width: 990px) {
    width: 18px;
  }
`;

export const IconAdd = styled(AddSquare)`
  color: ${colors.secondary};
  width: 24px;

  @media (max-width: 990px) {
    width: 18px;
  }
`;
