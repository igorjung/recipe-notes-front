import styled from 'styled-components';

// Icons
import { AddToQueue } from 'styled-icons/boxicons-regular';

// Color Schema
import colors from '~/styles/colors';

export const Container = styled.div`
  height: 60%;
  width: 100%;
  padding: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 16px;
  }
`;

export const IconAdd = styled(AddToQueue)`
  color: ${colors.secondary};
  width: 50px;

  @media (max-width: 990px) {
    width: 40px;
  }
`;
