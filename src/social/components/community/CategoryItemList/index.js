import { CommunitySortingMethod } from '@amityco/js-sdk';
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useNavigation } from '~/social/providers/NavigationProvider';
import { Grid, ListEmptyState } from './styles';
import useCategories from '~/social/hooks/useCategories';
import PaginatedList from '~/core/components/PaginatedList';
import EmptyFeedIcon from '~/icons/EmptyFeed';
import CategoryCard from '~/social/components/community/CategoryCard';

const CategoriesItemList = () => {
  const { onClickCategory } = useNavigation();
  // const categories = useCategories({ isDeleted: false });

  const [categories, hasMore, loadMore, loading, loadingMore] = useCategories({ isDeleted: false });

  console.log("golftest",[categories, hasMore, loadMore, loading, loadingMore]);
  
  const items = useMemo(() => {
    function getLoadingItems() {
      return new Array(6).fill(1).map((x, index) => ({ categoryId: index, skeleton: true }));
    }

    if (loading) {
      return getLoadingItems();
    }

    if (!loadingMore) {
      return categories;
    }

    return [...categories, ...getLoadingItems()];
  }, [categories, loading, loadingMore]);

  return (
    (items.length > 0 ) ? (
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
      {({ categoryId, skeleton }) =>
        skeleton ? (
          <CategoryCard key={categoryId} loading />
        ) : (
          <CategoryCard key={categoryId} categoryId={categoryId} onClick={onClickCategory} />
        )
      }
    </PaginatedList>
    ) : (
      <ListEmptyState
      icon={<EmptyFeedIcon width={48} height={48} />}
      title={<FormattedMessage id="CategoryCommunitiesList.emptyTitle" />}
      description={<FormattedMessage id="CategoryCommunitiesList.emptyDescription" />}
    />
      )

  );
};

export default memo(CategoriesItemList);
