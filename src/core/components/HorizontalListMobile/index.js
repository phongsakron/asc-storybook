import React, { useRef, useState } from 'react';
import styled from 'styled-components';
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
        @media (min-width: ${breakpoint}px) {
        grid-auto-columns: calc((100% / ${column}) - (${ITEM_SPACE_SIZE}px * ${
        column - 1
      } / ${column}));
    }
  `,
    )} );
`;

const HorizontalListMobile = ({ title = '', children, columns = DEFAULT_COLUMN_NUMBER }) => {
  const { onClickCategoryList } = useNavigation();

  const containerRef = useRef(null);
  const [page] = useState(0);

  return (
    <div>
      <Header>
        <Title>{title}</Title>
        <Pagination>
          <PaginationButton onClick={() => onClickCategoryList()}>
            <ChevronRightIcon height="20px" />
          </PaginationButton>
        </Pagination>
      </Header>
      <ScrollContainer ref={containerRef} page={page}>
        <StretchedList columns={columns}>{children}</StretchedList>
      </ScrollContainer>
    </div>
  );
};

export default HorizontalListMobile;
