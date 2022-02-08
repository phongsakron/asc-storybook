import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Bars, Search } from '~/icons';

export const BarsIcon = styled(Bars)`
  font-size: 20px;
  cursor: pointer;
`;

export const SearchIcon = styled(Search)`
  font-size: 20px;
  cursor: pointer;
`;
export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
`;

const NavBar = ({ onClickBars, onClickSearch }) => {
  return (
    <Nav>
      <BarsIcon onClick={onClickBars} />
      <SearchIcon onClick={onClickSearch} />
    </Nav>
  );
};

NavBar.propTypes = {
  onClickBars: PropTypes.func,
  onClickSearch: PropTypes.func,
};

export default NavBar;
