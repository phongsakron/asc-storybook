import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SideMenu from '~/core/components/SideMenu';
import UiKitSocialSearch from '~/social/components/SocialSearch';

const SocialSearch = styled(UiKitSocialSearch)`
  background: ${({ theme }) => theme.palette.system.background};
  padding: 0.5rem;
  flex: 1;
`;

const SearchSideMenu = ({ className, onClose }) => {
  // eslint-disable-next-line no-console
  const handleKeyDown = () => console.log;

  return (
    <SideMenu className={className}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
        <SocialSearch sticky />
        <div role="button" tabIndex="0" onKeyDown={handleKeyDown} onClick={onClose}>
          close
        </div>
      </div>
    </SideMenu>
  );
};

SearchSideMenu.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
};

export default SearchSideMenu;
