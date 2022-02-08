import React from 'react';
import { FormattedMessage } from 'react-intl';

export const UserFeedTabs = {
  TIMELINE: 'TIMELINE',
  GALLERY: 'GALLERY',
  FOLLOWERS: 'FOLLOW LIST',
};

export const tabs = [
  { value: UserFeedTabs.TIMELINE, label: <FormattedMessage id="tabs.timeline" /> },
  { value: UserFeedTabs.GALLERY, label: <FormattedMessage id="tabs.gallery" /> },
  { value: UserFeedTabs.FOLLOWERS, label: <FormattedMessage id="tabs.followList" /> },
];
