// Dependencies
import styled from 'styled-components';
import Modal from 'react-modal';

// Color Schema
import colors from '~styles/colors';

// StyledComponents
export const Container = styled(Modal)`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 600px;
  padding: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  background: ${colors.primary};
  border-radius: 10px;
  overflow-y: auto;

  @media (max-width: 500px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

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

export const Section = styled.div`
  padding: 32px 0;
`;

export const Footer = styled.footer`
  width: 100%;
  margin-top: 32px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
