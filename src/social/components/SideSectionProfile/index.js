import React from 'react';
import PropTypes from 'prop-types';
import withSDK from '~/core/hocs/withSDK';

import { backgroundImage as User } from '~/icons/User';
import SideMenuSection from '~/core/components/SideMenuSection';
import { useNavigation } from '~/social/providers/NavigationProvider';
import SideMenuActionItem from '~/core/components/SideMenuActionItem';
import useUser from '~/core/hooks/useUser';
import Avatar from '~/core/components/Avatar';

const SideSectionProfile = ({ currentUserId }) => {
  const { onClickUser } = useNavigation();
  const { file } = useUser(currentUserId);

  return (
    <SideMenuSection>
      <SideMenuActionItem
        iconProfile={
          <Avatar
            avatar={file.fileUrl}
            backgroundImage={User}
            loading={false}
            onClick={onClickUser}
          />
        }
        active={false}
        onClick={() => onClickUser(currentUserId)}
      >
        {currentUserId}
      </SideMenuActionItem>
    </SideMenuSection>
  );
};

SideSectionProfile.propTypes = {
  currentUserId: PropTypes.string.isRequired,
};

export default withSDK(SideSectionProfile);
