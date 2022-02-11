import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';

import { PageTypes } from '~/social/constants';

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
  width: 100%;
`;

const StyledCommunitySideMenu = styled(CommunitySideMenu)`
  min-height: 100%;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;
const StyledSearchSideMenu = styled(SearchSideMenu)`
  min-height: 100%;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const Community = () => {
  const { page } = useNavigation();
  const [isShowAside, setIsShowAside] = useState(false);
  const [isShowHeader, setIsShowHeader] = useState(true);
  const [asidePage, setAsidePage] = useState('Explore');
  const [isMobile, setIsMobile] = useState(false);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  // eslint-disable-next-line no-shadow
  const handleToggleAside = page => {
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
    if (isMobile) {
      setIsShowAside(false);
    }
    return page.type;
  }, [isMobile, page]);

  useEffect(() => {
    if (windowDimensions.width <= 768) {
      // setIsShowHeader(true)
      setIsShowAside(false);
      setIsMobile(true);
    } else {
      setIsShowAside(true);
      setIsMobile(false);
    }
  }, [windowDimensions]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // eslint-disable-next-line no-shadow
  const asideRender = page => {
    if (page === 'Explore') {
      return <StyledCommunitySideMenu activeCommunity={page.communityId} />;
    }
    return (
      <StyledSearchSideMenu
        onClose={() => {
          setIsShowHeader(true);
          setIsShowAside(false);
        }}
      />
    );
  };

  return (
    <ApplicationContainer>
      <MainLayout
        header={
          isShowHeader ? (
            <NavBar
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
        aside={isShowAside ? asideRender(asidePage) : <div />}
      >
        {currPage === PageTypes.Explore && <ExplorePage />}

        {currPage === PageTypes.NewsFeed && <NewsFeedPage />}

        {currPage === PageTypes.CommunityFeed && (
          <CommunityFeedPage communityId={page.communityId} isNewCommunity={page.isNewCommunity} />
        )}

        {currPage === PageTypes.CommunityEdit && (
          <CommunityEditPage communityId={page.communityId} tab={page.tab} />
        )}

        {currPage === PageTypes.Category && (
          <CategoryCommunitiesPage categoryId={page.categoryId} />
        )}

        {page.type === PageTypes.CategoryList && <CategoriesList />}

        {page.type === PageTypes.UserFeed && <UserFeedPage userId={page.userId} />}

        {currPage === PageTypes.UserEdit && <ProfileSettings userId={page.userId} />}
      </MainLayout>
    </ApplicationContainer>
  );
};

export default Community;
