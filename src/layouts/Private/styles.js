// Dependencies
import styled from 'styled-components';
import { Menu } from 'styled-icons/boxicons-regular';

// Color Schema
import colors from '~styles/colors';

// StyledComponents
export const Wrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Button = styled.button`
  height: 30px;
  width: 30px;
  border-radius: 0 10px 10px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.primary};
`;

export const IconMenu = styled(Menu)`
  color: ${colors.secondary};
  height: 24px;

  @media (max-width: 990px) {
    height: 18px;
  }
`;
