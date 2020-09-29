import React from 'react';
import { toHumanString } from 'human-readable-numbers';
import Truncate from 'react-truncate-markup';
import { customizableComponent } from 'hocs/customization';

import { useCommunitiesMock, getMyCommunityIds, usePostsMock } from 'mock';
import { confirm } from 'components/Confirm';

import Button, { PrimaryButton } from 'components/Button';
import {
  Count,
  Avatar,
  Container,
  ProfileName,
  Header,
  Options,
  Category,
  Description,
  PlusIcon,
  PencilIcon,
} from './styles';

const DEFAULT_DISPLAY_NAME = 'Anonymous';

const ProfileBarHeader = ({ avatar, options }) => {
  return (
    <Header>
      <Avatar avatar={avatar} />
      <Options options={options} />
    </Header>
  );
};

export const CommunityProfileBar = customizableComponent(
  'CommunityProfileBar',
  ({ community, onEditCommunityClick }) => {
    const { name, communityId, avatar, postsCount, description } = community;

    const { joinCommunity, leaveCommunity } = useCommunitiesMock();

    const leaveConfirm = () =>
      confirm({
        title: 'Leave community?',
        content:
          'You won’t no longer be able to post and interact in this community after leaving.',
        okText: 'Leave',
        onOk: () => leaveCommunity(communityId),
      });

    const myCommunityIds = getMyCommunityIds();

    const isMine = myCommunityIds.includes(communityId);

    return (
      <Container>
        <ProfileBarHeader
          avatar={avatar}
          options={[
            { name: 'Edit community', action: () => onEditCommunityClick(communityId) },
            { name: 'Leave Community', action: leaveConfirm },
          ]}
        />
        <ProfileName>{name}</ProfileName>
        <Category>Category</Category>
        <div>
          <Count>{toHumanString(postsCount)}</Count> posts
          <Count>{toHumanString(postsCount)}</Count> members
        </div>
        <Truncate lines={3}>
          <Description>{description}</Description>
        </Truncate>
        {!isMine && (
          <PrimaryButton fullWidth centered onClick={() => joinCommunity(communityId)}>
            <PlusIcon /> Join
          </PrimaryButton>
        )}
      </Container>
    );
  },
);

export const UserProfileBar = ({ user = {}, editProfile }) => {
  const { avatar, name, description, userId } = user;

  const { posts } = usePostsMock(userId);

  return (
    <Container>
      <ProfileBarHeader avatar={avatar} options={[]} />
      <ProfileName>{name || DEFAULT_DISPLAY_NAME}</ProfileName>
      <div>
        <Count>{toHumanString(posts.length)}</Count> posts
      </div>
      <Description>{description}</Description>
      <Button fullWidth centered onClick={() => editProfile(userId)}>
        <PencilIcon /> Edit profile
      </Button>
    </Container>
  );
};