import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import useMeasure from 'react-use/lib/useMeasure';
import useScroll from 'react-use/lib/useScroll';
import Button from '~/core/components/Button';
import ChevronRightIcon from '~/icons/ChevronRight';
import { useNavigation } from '~/social/providers/NavigationProvider';

const ITEM_SPACE_SIZE = 0;
const DEFAULT_COLUMN_NUMBER = {
  1024: 2,
  1280: 3,
  1440: 4,
  1800: 5,
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 16px 0;
  align-items: flex-end;
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.headline};
  display: inline-block;
  margin: 0;
`;

const Pagination = styled.div`
  display: flex;
  gap: 20px;
`;

const PaginationButton = styled(Button).attrs({ variant: 'secondary' })`
  width: 28px;
  padding: 2px;

  &:hover {
    background-color: transparent;
  }

  &:disabled {
    color: ${({ theme }) => theme.palette.neutral.shade3};
  }
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
`;

const StretchedList = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
  max-height: 0px;
  visibility: hidden;
  grid-gap: ${ITEM_SPACE_SIZE}px;

  ${({ columns }) =>
    Object.entries(columns).map(
      ([breakpoint, column]) => `
        @media (max-width: ${breakpoint}px) {
        grid-auto-columns: calc((100% / ${column}) - (${ITEM_SPACE_SIZE}px * ${column -
        1} / ${column}));
    }
  `,
    )} );
`;

function HorizontalListMobile({
  title = '',
  children,
  columns = DEFAULT_COLUMN_NUMBER,
  hasMore = false,
  loadMore = () => {},
}) {
  const { onClickCategoryList } = useNavigation();

  const containerRef = useRef(null);
  const { x: scrollPosition } = useScroll(containerRef);
  const [wrapperRef, { width }] = useMeasure();
  const [page] = useState(0);
  console.log(children);
  const contentWidth = useMemo(() => containerRef.current?.scrollWidth ?? 0, [
    containerRef.current?.scrollWidth,
  ]);

  const hasMultiPage = useMemo(() => contentWidth > width, [contentWidth, width]);

  useEffect(
    () =>
      containerRef.current?.scrollTo({
        left: (width + ITEM_SPACE_SIZE) * page,
        behavior: 'smooth',
      }),
    [containerRef.current, width, page],
  );

  useEffect(() => {
    if (scrollPosition >= contentWidth - width * 2 && hasMore) {
      loadMore();
    }
  }, [scrollPosition, contentWidth, width, hasMore]);

  return (
    <div ref={wrapperRef}>
      <Header>
        <Title>{title}</Title>
        {hasMultiPage && (
          <Pagination>
            <PaginationButton onClick={() => onClickCategoryList()}>
              <ChevronRightIcon height="20px" />
            </PaginationButton>
          </Pagination>
        )}
      </Header>
      <ScrollContainer ref={containerRef} page={page}>
        <StretchedList columns={columns}>{children}</StretchedList>
      </ScrollContainer>
    </div>
  );
}

export default HorizontalListMobile;
