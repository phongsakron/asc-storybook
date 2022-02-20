import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Bars, Search } from '~/icons';

const BarsIcon = styled(Bars)`
  font-size: 20px;
  cursor: pointer;
`;

const SearchIcon = styled(Search)`
  font-size: 20px;
  cursor: pointer;
`;
const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
`;
const CurrentPageText = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-transform: capitalize;
`;

const NavBar = ({ onClickBars, onClickSearch, currentPage }) => {
  return (
    <Nav>
      <BarsIcon onClick={onClickBars} />
      <CurrentPageText>{currentPage}</CurrentPageText>
      <SearchIcon onClick={onClickSearch} />
    </Nav>
  );
};

NavBar.propTypes = {
  currentPage: PropTypes.string,
  onClickBars: PropTypes.func,
  onClickSearch: PropTypes.func,
};

export default NavBar;
