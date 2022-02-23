import { CommunitySortingMethod } from '@amityco/js-sdk';
import React, { memo, useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useNavigation } from '~/social/providers/NavigationProvider';
import useCommunitiesList from '~/social/hooks/useCommunitiesList';
import PaginatedList from '~/core/components/PaginatedList';
import EmptyFeedIcon from '~/icons/EmptyFeed';
import CommunityCard from '~/social/components/community/Card';
import { Grid, ListEmptyState } from './styles';

const CategoryCommunitiesList = ({ categoryId }) => {
  const { onClickCommunity } = useNavigation();
  const [communities, hasMore, loadMore, loading, loadingMore] = useCommunitiesList({
    categoryId,
    sortBy: CommunitySortingMethod.DisplayName,
  });

  const items = useMemo(() => {
    function getLoadingItems() {
      return new Array(5).fill(1).map((x, index) => ({ communityId: index, skeleton: true }));
    }

    if (loading) {
      return getLoadingItems();
    }

    if (!loadingMore) {
      return communities;
    }

    return [...communities, ...getLoadingItems()];
  }, [communities, loading, loadingMore]);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions.width > 768 ? (
    <PaginatedList
      items={items}
      hasMore={hasMore}
      loadMore={loadMore}
      container={Grid}
      emptyState={
        <ListEmptyState
          icon={<EmptyFeedIcon width={48} height={48} />}
          title={<FormattedMessage id="CategoryCommunitiesList.emptyTitle" />}
          description={<FormattedMessage id="CategoryCommunitiesList.emptyDescription" />}
        />
      }
    >
      {({ communityId, skeleton }) =>
        skeleton ? (
          <CommunityCard key={communityId} loading css="width: 100%;max-width: 176px;" />
        ) : (
          <CommunityCard
            key={communityId}
            communityId={communityId}
            css="width: 100%;max-width: 176px;"
            onClick={onClickCommunity}
          />
        )
      }
    </PaginatedList>
  ) : (
    <PaginatedList
      items={items}
      hasMore={hasMore}
      loadMore={loadMore}
      container={Grid}
      emptyState={
        <ListEmptyState
          icon={<EmptyFeedIcon width={48} height={48} />}
          title={<FormattedMessage id="CategoryCommunitiesList.emptyTitle" />}
          description={<FormattedMessage id="CategoryCommunitiesList.emptyDescription" />}
        />
      }
    >
      {({ communityId, skeleton }) =>
        skeleton ? (
          <CommunityCard
            key={communityId}
            loading
            css="width: 100%;max-width: 176px;margin:auto;"
          />
        ) : (
          <CommunityCard
            key={communityId}
            communityId={communityId}
            css="width: 100%;max-width: 176px;margin:auto;"
            onClick={onClickCommunity}
          />
        )
      }
    </PaginatedList>
  );
};

CategoryCommunitiesList.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default memo(CategoryCommunitiesList);
