import React from 'react';
import { Link } from 'react-router-dom';
import iconSearch from '../../Assets/icons/icon-search.svg';
import styled from 'styled-components';
export default function SearchBtn() {
  return (
    <Link to='/search'>
      <SearchButton src={iconSearch} alt='유저 검색 이동'></SearchButton>
    </Link>
  );
}
const SearchButton = styled.img`
  width: 2.2rem;
`;
