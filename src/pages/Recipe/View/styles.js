import styled from 'styled-components';

// Color Schema
import colors from '~/styles/colors';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 64px;

  @media (max-width: 990px) {
    padding: 32px 16px;
  }

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

  @media (max-width: 990px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
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

  @media (max-width: 990px) {
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    & + div {
      margin: 8px 0 0 0;
    }
  }
`;

export const Body = styled.div`
  height: 100%;
  width: 100%;

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
  }

  @media (max-width: 990px) {
    padding: 0 8px;
  }

  @media (max-width: 500px) {
    padding: 0;
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

  strong {
    word-break: break-word;
  }
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

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      strong {
        margin-left: 8px;
      }
    }

    h3 {
      font-size: 22px;
      color: ${colors.secondary};
    }
  }

  section {
    padding: 0 32px;
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
  margin-top: 32px;
  padding: 0 16px 64px 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 990px) {
    padding: 0 8px 64px 8px;
  }
`;

export const Title = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

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
