import styled from 'styled-components';

export const MenuList = styled.div`
  flex: 1 1 auto;
  z-index: 1;
  position: relative;
  display: block;
  overflow-y: auto;
  min-height: 3em;
  ${({ maxHeight }) =>
    maxHeight &&
    `
    max-height: ${maxHeight};
  `};
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
`;

export const Placeholder = styled.div`
  flex: 1 1 auto;
  z-index: 1;
  position: relative;
  background: #fff;
  padding: 18px 72px 18px 72px;
  color: ${({ theme }) => theme.palette.base.shade3};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
