import styled from 'styled-components';

import InputAutocomplete from '~/core/components/InputAutocompleteNoPopup';
import Search from '~/icons/Search';

export const SearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

export const SearchIcon = styled(Search)`
  color: ${({ theme }) => theme.palette.base.shade2};
  font-size: 16px;
`;

export const SocialSearchContainer = styled.div`
  position: relative;
  padding: 0;
  ${({ sticky }) =>
    sticky &&
    `
      z-index: 500;
      position: sticky;
      top: 0;
    `};
`;

export const SocialSearchInput = styled(InputAutocomplete)`
  ${({ theme }) => theme.typography.body};
  width: 100%;
  background: ${({ theme }) => theme.palette.system.background};
  border: 1px solid #d5d7dd;
  border-radius: 4px;
  outline: none;
  color: ${({ theme }) => theme.palette.base.main};

  &::placeholder {
    color: ${({ theme }) => theme.palette.base.shade1};
  }
`;
