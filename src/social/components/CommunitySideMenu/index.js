import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SideMenu from '~/core/components/SideMenu';
import SideSectionCommunity from '~/social/components/SideSectionCommunity';
import SideSectionProfile from '~/social/components/SideSectionProfile';
import SideSectionMyCommunity from '~/social/components/SideSectionMyCommunity';
import UiKitSocialSearch from '~/social/components/SocialSearch';

const SocialSearch = styled(UiKitSocialSearch)`
  background: ${({ theme }) => theme.palette.system.background};
  padding: 0.5rem;
  @media (max-width: 768px) {
    display: none;
  }
  display: block;
`;

const CommunitySideMenu = ({ className, activeCommunity }) => (
  <SideMenu className={className}>
    <SocialSearch sticky />

    <SideSectionCommunity />
    <SideSectionProfile />

    <SideSectionMyCommunity activeCommunity={activeCommunity} />
  </SideMenu>
);

CommunitySideMenu.propTypes = {
  className: PropTypes.string,
  activeCommunity: PropTypes.string,
};

export default CommunitySideMenu;
