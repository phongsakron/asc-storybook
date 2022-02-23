import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

import { PageTypes, PageTypesToTitle } from '~/social/constants';

import MainLayout from '~/social/layouts/Main';

import CommunitySideMenu from '~/social/components/CommunitySideMenu';
import SearchSideMenu from '~/social/components/SearchSideMenu';
import NavBar from '~/social/components/NavBar';

import ExplorePage from '~/social/pages/Explore';
import NewsFeedPage from '~/social/pages/NewsFeed';
import CommunityFeedPage from '~/social/pages/CommunityFeed';
import UserFeedPage from '~/social/pages/UserFeed';
import CategoryCommunitiesPage from '~/social/pages/CategoryCommunities';
import CommunityEditPage from '~/social/pages/CommunityEdit';
import ProfileSettings from '~/social/components/ProfileSettings';
import CategoriesList from '~/social/pages/CategoriesList';

import { useNavigation } from '~/social/providers/NavigationProvider';

const ApplicationContainer = styled.div`
  height: 100%;
  max-height: 100vh;
  overflow: auto;
  width: 100%;
`;
const AsideContainer = styled.div`
  min-height: 100%;
  display: inline;
`;

const StyledCommunitySideMenu = styled(CommunitySideMenu)`
  min-height: 100%;
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledCommunitySideMenuMobile = styled(CommunitySideMenu)`
  min-height: 100%;
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 100vw;
  }
`;

const StyledSearchSideMenu = styled(SearchSideMenu)`
  min-height: 100%;
  overflow: auto;
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 100vw;
  }
`;

const ContentsLayout = styled.div`
  max-height: 100vh;
  padding: 0 20px 0 20px;
  overflow: auto;
`;

const Community = () => {
  const { page } = useNavigation();
  const [isShowHeader, setIsShowHeader] = useState(true);
  const [asidePage, setAsidePage] = useState('Explore');
  const [isShowAside, setIsShowAside] = useState(false);

  // eslint-disable-next-line no-shadow
  const handleToggleAside = (page) => {
    if (asidePage !== page) {
      setAsidePage(page);
      setIsShowAside(true);
      return;
    }
    setIsShowAside(!isShowAside);
  };

  const currPage = useMemo(() => {
    setIsShowHeader(true);
    setAsidePage('Explore');
    setIsShowAside(false);
    return page.type;
  }, [page]);

  return (
    <ApplicationContainer>
      <MainLayout
        header={
          isShowHeader ? (
            <NavBar
              currentPage={PageTypesToTitle[currPage]}
              onClickBars={() => handleToggleAside('Explore')}
              onClickSearch={() => {
                handleToggleAside('Search');
                setIsShowHeader(false);
              }}
            />
          ) : (
            <div />
          )
        }
        aside={
          <AsideContainer>
            <StyledCommunitySideMenu activeCommunity={page.communityId} />
            {isShowAside && asidePage === 'Explore' && (
              <StyledCommunitySideMenuMobile activeCommunity={page.communityId} />
            )}
            {isShowAside && asidePage === 'Search' && (
              <StyledSearchSideMenu
                onClose={() => {
                  setIsShowHeader(true);
                  setIsShowAside(false);
                }}
              />
            )}
          </AsideContainer>
        }
      >
        <ContentsLayout>
          {currPage === PageTypes.Explore && <ExplorePage />}

          {currPage === PageTypes.NewsFeed && <NewsFeedPage />}

          {currPage === PageTypes.CommunityFeed && (
            <CommunityFeedPage
              communityId={page.communityId}
              isNewCommunity={page.isNewCommunity}
            />
          )}

          {currPage === PageTypes.CommunityEdit && (
            <CommunityEditPage communityId={page.communityId} tab={page.tab} />
          )}

          {currPage === PageTypes.Category && (
            <CategoryCommunitiesPage categoryId={page.categoryId} />
          )}

          {currPage === PageTypes.CategoryList && <CategoriesList />}

          {currPage === PageTypes.UserFeed && <UserFeedPage userId={page.userId} />}

          {currPage === PageTypes.UserEdit && <ProfileSettings userId={page.userId} />}
        </ContentsLayout>
      </MainLayout>
    </ApplicationContainer>
  );
};

export default Community;
