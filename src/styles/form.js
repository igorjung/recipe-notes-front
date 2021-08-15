// Dependencies
import styled from 'styled-components';
import { Form } from 'formik';

// Color Schema
import colors from '~styles/colors';

// StyledComponents
export const Container = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Title = styled.h1`
  font: 24px 'Roboto';
`;

export const Row = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: ${props =>
    props.columns ? `repeat(${props.columns}, 1fr)` : '1fr'};
  column-gap: 16px;

  & + ul {
    margin-top: 16px;
  }
`;

export const Column = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  label {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    strong {
      font-weight: bold;
      color: ${colors.tertiary};
      margin-bottom: 4px;

      margin-left: 8px;
    }
  }

  input {
    height: 40px;
    width: 100%;
    border: 0;
    border-radius: 5px;
    padding: 0 15px;
    color: #000;
    background-color: #ddd;

    :focus {
      border: 2px solid ${colors.secondary};
    }
  }

  span {
    margin: 8px 0 0 4px;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  margin-top: 32px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  button {
    margin-right: 8px;
  }
`;

export const SelectStyled = {
  control: base => ({
    ...base,
    height: 40,
    minHeight: 40,
    width: '100%',
    minWidth: '100%',
    border: `2px solid ${colors.tertiary}`,
    borderRadius: '5px',
    fontSize: 16,
    backgroundColor: `${colors.secondary}`,
    color: `${colors.tertiary}`,
    padding: '0 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }),

  container: provided => ({
    ...provided,
    height: 40,
    width: '100%',
    minWidth: '100%',
  }),

  valueContainer: provided => ({
    ...provided,
    height: 40,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }),

  input: provided => ({
    ...provided,
    height: 40,
    minWidth: '100%',
    color: `${colors.tertiary}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }),

  placeholder: provided => ({
    ...provided,
    height: 40,
    minWidth: '100%',
    color: '#666',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }),

  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? `${colors.secondary}` : `${colors.primary}`,
    backgroundColor: state.isSelected
      ? `${colors.primary}`
      : `${colors.secondary}`,
    borderRadius: '5px',
    fontSize: 16,
    padding: 10,
    height: 40,
    minHeight: 40,
  }),
};
