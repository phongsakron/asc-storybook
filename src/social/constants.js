export const PageTypes = {
  Explore: 'explore',
  Category: 'category',
  NewsFeed: 'newsfeed',
  UserFeed: 'userfeed',
  CommunityFeed: 'communityfeed',
  CommunityEdit: 'communityedit',
  UserEdit: 'useredit',
};

export const PageTypesToTitle = {
  [PageTypes.Explore]: 'Explore',
  [PageTypes.Category]: 'Category',
  [PageTypes.NewsFeed]: 'News Feed',
  [PageTypes.UserFeed]: 'User Feed',
  [PageTypes.CommunityFeed]: 'Community Feed',
  [PageTypes.CommunityEdit]: 'Community Edit',
  [PageTypes.UserEdit]: 'User Edit',
};

export const MemberRoles = Object.freeze({
  MEMBER: 'member',
  COMMUNITY_MODERATOR: 'community-moderator',
  CHANNEL_MODERATOR: 'channel-moderator',
});

export const MAXIMUM_MENTIONEES = 30;
