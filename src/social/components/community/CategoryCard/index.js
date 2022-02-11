import React, { memo, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FileRepository, ImageSize } from '@amityco/js-sdk';
import UICategoryCard from './UICategoryCard';
import useCategory from '~/social/hooks/useCategory';
import { margin } from 'polished';

const CategoryCard = ({ categoryId, className, loading, onClick, ...props }) => {
  const { category } = useCategory(categoryId);

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  let mentionStyle = {
    minWidth: '130px',
    minHeight: '120px',
    margin: 'auto'
  };
  
  if (windowDimensions.width < 376) {
    mentionStyle = {
      minWidth: '130px',
      minHeight: '120px',
      margin: 'auto'
    };
  } else {
    mentionStyle = {
      maxWidth: '150px',
      maxHeight: '160px',
      margin: 'auto',
    };
  }
  



  // TODO: this is temporary - we should use file.fileUrl when supported.
  const fileUrl = useMemo(
    () =>
      category.avatarFileId &&
      FileRepository.getFileUrlById({
        fileId: category.avatarFileId,
        imageSize: ImageSize.Medium,
      }),
    [category.avatarFileId],
  );

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowDimensions.width < 376) {
      mentionStyle = {
        minWidth: '130px',
        minHeight: '120px',
        margin: 'auto'
      };
    } else {
      mentionStyle = {
        maxWidth: '150px',
        maxHeight: '160px',
        margin: 'auto',
      };
    }
  }, [windowDimensions]);

  return (
    <UICategoryCard
      style={mentionStyle}
      avatarFileUrl={fileUrl}
      className={className}
      categoryId={category.categoryId}
      name={category.name}
      loading={loading}
      onClick={onClick}
      {...props}
    />
  );
};

CategoryCard.propTypes = {
  categoryId: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(CategoryCard);
