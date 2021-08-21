// Dependencies
import styled from 'styled-components';

// Color Schema
import colors from '~styles/colors';

// StyledComponents
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
  padding-bottom: 16px;
  margin-bottom: 32px;
  border-bottom: 1px solid ${colors.secondary};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: ${colors.secondary};
    font-size: 22px;
  }
`;

export const Body = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  strong {
    font-size: 18px;
  }
`;
