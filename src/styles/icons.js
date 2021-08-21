import styled from 'styled-components';

// Icons
import {
  AddBox,
  Delete,
  Edit,
  Menu,
  Person,
  LibraryBooks,
  WatchLater,
  Paid,
  RestaurantMenu,
  ShoppingBasket,
  Blender,
  Microwave,
  Visibility,
  VisibilityOff,
  Search,
  Close,
  MonitorWeight,
  Straighten,
  ToggleOn,
  Email,
  Lock,
  Logout,
} from '@styled-icons/material';

// Color Schema
import colors from '~/styles/colors';

export const IconAdd = styled(AddBox)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconDelete = styled(Delete)`
  color: ${colors.warning};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconEdit = styled(Edit)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconMenu = styled(Menu)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconPerson = styled(Person)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconRecipes = styled(LibraryBooks)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconTime = styled(WatchLater)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconCost = styled(Paid)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconCategory = styled(RestaurantMenu)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconIngredient = styled(ShoppingBasket)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconUtensil = styled(Blender)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconStep = styled(Microwave)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconHidden = styled(VisibilityOff)`
  color: '#333';
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconVisible = styled(Visibility)`
  color: '#333';
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconSearch = styled(Search)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconClose = styled(Close)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconWeight = styled(MonitorWeight)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconUnity = styled(Straighten)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconSwitch = styled(ToggleOn)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconEmail = styled(Email)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconPassword = styled(Lock)`
  color: ${colors.secondary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconLogout = styled(Logout)`
  color: ${colors.warning};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;
