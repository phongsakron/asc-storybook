import React from 'react';

import customizableComponent from '~/core/hocs/customization';
import CommunityName from '~/social/components/community/Name';
import { backgroundImage as CommunityImage } from '~/icons/Community';

import { Avatar, CommunityItemContainer } from './styles';

const CommunityItem = ({ community, active, onClick }) => (
  <CommunityItemContainer onClick={onClick} active={active}>
    <Avatar avatar={community.avatar} backgroundImage={CommunityImage} />
    <CommunityName
      isOfficial={community.isOfficial}
      isPublic={community.isPublic}
      name={community.displayName}
    />
  </CommunityItemContainer>
);

export default customizableComponent('CommunityItem', CommunityItem);
