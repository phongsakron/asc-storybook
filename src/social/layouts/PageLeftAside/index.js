import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const PageLayout = ({ header, aside, children }) => {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const isMobile = windowDimensions.width < 1000;

  let Container = styled.div`
    display: grid;

    grid-template-areas: 'main side';
    grid-template-columns: auto min-content;

    ${({ withHeader }) =>
      withHeader &&
      `
    grid-template-areas: 'header header' 'main side';
    grid-template-columns: auto min-content;
    grid-template-rows: min-content auto;
  `}

    width: 100%;
    height: 100%;
    grid-gap: 20px;
    overflow: hidden;
    margin: 0 auto;
    padding: 20px 0;
  `;

  if (!isMobile) {
    Container = styled.div`
      display: grid;

      grid-template-areas: 'main side';
      grid-template-columns: auto min-content;

      ${({ withHeader }) =>
        withHeader &&
        `
    grid-template-areas: 'header header' 'main side';
    grid-template-columns: auto min-content;
    grid-template-rows: min-content auto;
  `}

      width: 100%;
      height: 100%;
      grid-gap: 20px;
      overflow: hidden;
      margin: 0 auto;
      padding: 20px 0;
    `;
  } else {
    Container = styled.div`
      display: grid;

      grid-template-areas:
        'main main'
        'side side';
      grid-template-columns: auto min-content;

      ${({ withHeader }) =>
        withHeader &&
        `
    grid-template-areas: 'header header'
    'main main'
    'side side';
    grid-template-columns: auto min-content;
    grid-template-rows: min-content auto;
  `}

      ${({ withHeader }) =>
        withHeader &&
        `
  grid-template-areas: 'header header'
  'main main'
  'side side';
  grid-template-columns: auto min-content;
  grid-template-rows: min-content auto;
`}

  
  width: 100%;
      height: 100%;
      grid-gap: 20px;
      overflow: hidden;
      margin: 0 auto;
      padding: 20px 0;
    `;
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const HeaderContainer = styled.div`
    grid-area: header;
    width: 100%;
    height: 100%;
  `;

  const Main = styled.div`
    grid-area: main;
    width: 100%;
    height: 100%;
    overflow: auto;
  `;

  const Side = styled.div`
    grid-area: side;
    width: 100%;
    height: 100%;
    max-width: 20rem;
    overflow: auto;

    & > :not(:first-child) {
      margin-top: 20px;
    }
  `;

  return (
    <Container withHeader={!!header}>
      {header && <HeaderContainer>{header}</HeaderContainer>}
      <Main>{children}</Main>
      <Side>{aside}</Side>
    </Container>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
  aside: PropTypes.node,
  header: PropTypes.node,
};

PageLayout.defaultProps = {
  header: null,
};

export default PageLayout;
