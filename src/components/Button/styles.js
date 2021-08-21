// Dependencies
import styled from 'styled-components';

// StyledComponents
export const ButtonStyled = styled.button`
  height: 40px;
  width: 100%;
  max-width: 120px;

  background: ${props => props.background};
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 990px) {
    min-width: 60px;
  }

  strong {
    color: ${props => props.color};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
