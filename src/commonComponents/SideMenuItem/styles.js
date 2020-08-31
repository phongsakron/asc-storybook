import styled from 'styled-components';
import { SecondaryButton } from '../Button';

export const SideMenuItemContainer = styled(SecondaryButton)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 8px;
  margin-bottom: 6px;
  color: #17181c;
  &:hover {
    background-color: #ebecef;
  }
  &:disabled {
    color: #abaeba;
  }
  ${({ active, theme }) =>
    active &&
    `
      background: #F1F5FE;
      color: ${theme.color.primary1};
    `}
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  ${({ active, theme }) =>
    active
      ? `
      background: #1054DE;
      color: white;
    `
      : `
      background: #ebecef;
      color: #898e9e;
  `}
`;