import React, { useMemo, useEffect, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import useCategories from '~/social/hooks/useCategories';
import { useNavigation } from '~/social/providers/NavigationProvider';
import HorizontalList from '~/core/components/HorizontalList';
import HorizontalListMobile from '~/core/components/HorizontalListMobile';
import CommunityCategoryCard from '~/social/components/community/CategoryCard';

const List = () => {
  const { onClickCategory } = useNavigation();
  const [categories, hasMore, loadMore, loading, loadingMore] = useCategories({ isDeleted: false });
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
    <HorizontalList
      columns={{
        1024: 4,
        1280: 5,
        1440: 6,
        1800: 8,
      }}
      title={<FormattedMessage id="categoryList" />}
      hasMore={hasMore}
      loadMore={loadMore}
    >
      {items.map(({ categoryId, skeleton }) =>
        skeleton ? (
          <CommunityCategoryCard key={categoryId} loading />
        ) : (
          <CommunityCategoryCard
            key={categoryId}
            categoryId={categoryId}
            onClick={onClickCategory}
          />
        ),
      )}
    </HorizontalList>
  ) : (
    <HorizontalListMobile
      columns={{
        1024: 4,
        1280: 5,
        1440: 6,
        1800: 8,
      }}
      title={<FormattedMessage id="categoryList" />}
      hasMore={hasMore}
      loadMore={loadMore}
    >
      {items.map(({ categoryId, skeleton }) =>
        skeleton ? (
          <CommunityCategoryCard key={categoryId} loading />
        ) : (
          <CommunityCategoryCard
            key={categoryId}
            categoryId={categoryId}
            onClick={onClickCategory}
          />
        ),
      )}
    </HorizontalListMobile>
  );
};

export default List;
