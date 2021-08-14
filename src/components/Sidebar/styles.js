import styled from 'styled-components';

// Icons
import { PersonFill, BookmarkFill } from 'styled-icons/bootstrap';
import { FoodPizza } from 'styled-icons/fluentui-system-filled';
import { Search } from 'styled-icons/boxicons-regular';

// Color Schema
import colors from '~styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  background-color: ${colors.primary};
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 32px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.primary};
    border-radius: 30px;
  }
`;

export const Logo = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 16px;

  strong {
    color: ${colors.secondary};
    font-size: 18px;
  }

  p {
    margin-left: 4px;
    font-size: 18px;
  }
`;

export const User = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  h3 {
    margin-left: 8px;
  }
`;

export const List = styled.ul`
  height: 100%;
  width: 100%;
  margin: 16px 0;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.primary};
    border-radius: 30px;
  }

  header {
    width: 100%;
    margin-bottom: 12px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    h3 {
      margin-left: 8px;
    }

    hr {
      flex: 1;
      height: 2px;
      margin-left: 8px;
      border: 0;
      background-color: ${colors.secondary};
    }
  }
`;

export const Item = styled.li`
  width: 100%;
  padding-left: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  li + & {
    margin-top: 12px;
  }

  strong {
    margin-left: 8px;
  }
`;

export const Filter = styled.div`
  height: 40px;
  width: 100%;
  padding: 0 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  background-color: #000;

  input {
    height: 40px;
    width: 100%;

    padding: 0 15px;

    background-color: #000;
    color: ${colors.tertiary};
    border: 0;
  }
`;

export const IconPerson = styled(PersonFill)`
  color: ${colors.secondary};
  width: 18px;

  @media (max-width: 990px) {
    width: 16px;
  }
`;

export const IconBook = styled(BookmarkFill)`
  color: ${colors.secondary};
  width: 18px;

  @media (max-width: 990px) {
    width: 16px;
  }
`;

export const IconSearch = styled(Search)`
  color: ${colors.tertiary};
  width: 20px;

  @media (max-width: 990px) {
    width: 18px;
  }
`;

export const IconPizza = styled(FoodPizza)`
  color: ${colors.secondary};
  width: 18px;

  @media (max-width: 990px) {
    width: 16px;
  }
`;
