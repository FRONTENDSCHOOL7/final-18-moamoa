import React from 'react';
import iconSearch from '../../Assets/icons/icon-search.svg';
import MOAMOA from '../../Assets/images/MOAMOA.png';
import { Link } from 'react-router-dom';
import { HeaderContainer, H1, HomeBtn, SearchBtn } from './HeaderContainer';

export default function Header() {
  return (
    <HeaderContainer>
      <Link to='/home'>
        <H1>모아모아 피드</H1>
        <HomeBtn src={MOAMOA} alt='홈으로 이동' />
      </Link>
      <Link to='/search'>
        <SearchBtn src={iconSearch} alt='검색하기'></SearchBtn>
      </Link>
    </HeaderContainer>
  );
}