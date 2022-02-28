import React, { memo } from 'react';
import PropTypes from 'prop-types';

import useCommunity from '~/social/hooks/useCommunity';

import UICommunityCard from './UICommunityCard';

const CategoryCard = ({ categoryId, className, loading, onClick, ...props }) => {
  const { category } = useCategory(categoryId);

  const { fileUrl } = file;

  const { membersCount, description } = category;

  return (
    <UICommunityCard
      avatarFileUrl={fileUrl}
      categoryId={categoryId}
      categoryCategories={categoryCategories}
      membersCount={membersCount}
      description={description}
      isOfficial={category.isOfficial}
      isPublic={category.isPublic}
      name={category.displayName}
      onClick={onClick}
      {...props}
    />
  );
};

CommunityCard.propTypes = {
  categoryId: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(CategoryCard);
