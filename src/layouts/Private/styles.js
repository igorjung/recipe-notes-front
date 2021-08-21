// Dependencies
import styled from 'styled-components';

// Color Schema
import colors from '~/styles/colors';

// StyledComponents
export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Button = styled.button`
  position: fixed;
  top: 0;
  left: 0;

  height: 30px;
  width: 45px;
  border-radius: 0 10px 10px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.primary};
`;
