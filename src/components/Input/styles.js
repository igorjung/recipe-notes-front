import styled from 'styled-components';

// Icons
import { LockAlt, LockOpenAlt } from 'styled-icons/boxicons-solid';

export const Container = styled.div`
  height: 40px;
  width: 100%;
  border-radius: 5px;
  padding-right: 15px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  background-color: #ddd;

  button {
    height: 40px;
    width: 40px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

export const IconVisible = styled(LockOpenAlt)`
  color: #333;
  width: 24px;

  @media (max-width: 990px) {
    width: 24px;
  }
`;

export const IconHidden = styled(LockAlt)`
  color: #333;
  width: 24px;

  @media (max-width: 990px) {
    width: 24px;
  }
`;
