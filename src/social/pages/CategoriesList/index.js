import React from 'react';
import PropTypes from 'prop-types';
import { PageTypes } from '~/social/constants';
import useCategory from '~/social/hooks/useCategory';
import useCategories from '~/social/hooks/useCategories';
import CategoriesItemList from '~/social/components/community/CategoryItemList';
import { useNavigation } from '~/social/providers/NavigationProvider';
import ArrowLeft from '~/icons/ArrowLeft';
import { BackButton, Header, PageContainer, Title } from './styles';

const CategoriesList = () => {
  const { onChangePage } = useNavigation();

  const title = "Categories";

  const onBack = () => onChangePage(PageTypes.Explore);

  return (
    <PageContainer> 
      <Header>
        <BackButton onClick={onBack}>
          <ArrowLeft />
        </BackButton>
        <Title>{title}</Title>
      </Header>
      <CategoriesItemList />
    </PageContainer>
  );
};

export default CategoriesList;
