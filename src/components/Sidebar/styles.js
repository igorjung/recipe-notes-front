import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Color Schema
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 400px;

  @media (max-width: 500px) {
    max-width: 100%;
  }

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
    background: ${colors.primary};
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled(Link)`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  strong {
    color: ${colors.secondary};
    font-size: 18px;
  }

  p {
    margin-left: 4px;
    font-size: 18px;
  }
`;

export const User = styled(Link)`
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
    background: ${colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.secondary};
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

  section {
    width: 100%;
    padding-left: 8px;
  }

  button {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 12px;

    strong {
      margin-left: 8px;
      color: ${colors.warning};
    }
  }
`;

export const Item = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  a + & {
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
