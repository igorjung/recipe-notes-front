import styled from 'styled-components';

// Icons
import { Email } from 'styled-icons/entypo';
import { Password } from 'styled-icons/material';
import { DriveFileRenameOutline } from 'styled-icons/material-sharp';

// Color Schema
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1120px;
  padding: 64px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 32px;
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 600px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  h1 {
    margin-bottom: 32px;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  margin-top: 32px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  a {
    margin-left: 8px;
    text-decoration: underline;
    color: ${colors.secondary};
  }
`;

export const Logo = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 32px;

  strong {
    color: ${colors.secondary};
    font-size: 24px;
  }

  p {
    margin-left: 4px;
    font-size: 24px;
  }
`;

export const IconName = styled(DriveFileRenameOutline)`
  color: ${colors.secondary};
  width: 16px;

  @media (max-width: 990px) {
    width: 14px;
  }
`;

export const IconEmail = styled(Email)`
  color: ${colors.secondary};
  width: 16px;

  @media (max-width: 990px) {
    width: 14px;
  }
`;

export const IconPassword = styled(Password)`
  color: ${colors.secondary};
  width: 16px;

  @media (max-width: 990px) {
    width: 14px;
  }
`;
