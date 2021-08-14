import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import colors from './colors';

export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

*:focus {
  outline: 0;
}

html,body, #root {
  height: 100%;
  background: #333;
}

body, input, textarea {
  font: 16px "Roboto";

  @media (max-width: 990px) {
    font: 14px "Roboto";
  }
}

button {
  cursor: pointer;
  font: bold 16px "Roboto";
  background: none;
  border: 0;

  @media (max-width: 990px) {
    font: bold 14px "Roboto";
  }
}

h1 {
  font: bold 32px "Roboto";
  color: ${colors.tertiary};

  @media (max-width: 990px) {
    font: bold 24px "Roboto";
  }
}

h2 {
  font: bold 18px "Roboto";
  color: ${colors.tertiary};

  @media (max-width: 990px) {
    font: bold 16px "Roboto";
  }
}

h3 {
  font: bold 16px "Roboto";
  color: ${colors.tertiary};

  @media (max-width: 990px) {
    font: bold 14px "Roboto";
  }
}

strong {
  font: bold 16px "Roboto";
  color: ${colors.tertiary};

  @media (max-width: 990px) {
    font: bold 14px "Roboto";
  }
}

p {
  font: 16px "Roboto";
  color: ${colors.tertiary};

  @media (max-width: 990px) {
    font: 14px "Roboto";
  }
}

span {
  font-weight: bold;
  color: ${colors.warning};
}

a {
  text-decoration: none;
  font-weight: bold;
  color: ${colors.tertiary};
}

ul {
  list-style: none;
}

li {
  list-style: none;
}
`;
