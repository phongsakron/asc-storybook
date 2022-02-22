import React from 'react';
import styled from 'styled-components';

import customizableComponent from '~/core/hocs/customization';

const Container = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-areas: 'side main' 'none main';
  grid-template-columns: min-content auto;
  grid-template-rows: 100%;
  width: 100%;
  height: 100%;
  background: #f7f7f8;
`;

const Main = styled.div`
  grid-area: main;
  overflow: auto;
  width: 100%;
  min-width: 20rem;
  margin: 0 auto;
`;

const Side = styled.div`
  grid-area: side;
  overflow: auto;
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 9999;
  background: #fff;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const LayoutContainer = styled.div`
  height: inherit;
  max-height: 100%;
  width: 100%;
  /* hidden scroll */
  overflow: scroll;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;

const Layout = ({ aside, header, children }) => {
  return (
    <LayoutContainer>
      <Header>{header}</Header>
      <Container>
        <Main>{children}</Main>
        <Side>{aside}</Side>
      </Container>
    </LayoutContainer>
  );
};

export default customizableComponent('Layout', Layout);
