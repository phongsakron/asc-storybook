import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SideMenu from '~/core/components/SideMenu';
import UiKitSocialSearch from '~/social/components/SocialSearchNoPopup';

const SocialSearch = styled(UiKitSocialSearch)`
  background: ${({ theme }) => theme.palette.system.background};
  flex: 1;
`;
const SearchContainer = styled.div`
  display: 'flex';
  align-items: 'center';
`;

const SearchSideMenu = ({ className, onClose }) => {
  return (
    <SideMenu className={className}>
      <SearchContainer>
        <SocialSearch sticky onClose={onClose} />
      </SearchContainer>
    </SideMenu>
  );
};

SearchSideMenu.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
};

export default SearchSideMenu;
