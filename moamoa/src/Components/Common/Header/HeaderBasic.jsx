import React from 'react';
import Gobackbtn from './GoBackbtn';
import iconSearch from '../../Assets/icons/icon-search.svg';
import MOAMOA from '../../Assets/images/MOAMOA.png';
import { Link } from 'react-router-dom';
import { HeaderContainer, HomeBtn, SearchBtn } from './HeaderStyle';

export default function Header() {
  return (
    <HeaderContainer>
      <Gobackbtn />
      <Link to='/home'>
        <HomeBtn src={MOAMOA} alt='홈으로 이동' />
      </Link>
      <Link to='/search'>
        <SearchBtn src={iconSearch} alt='검색하기'></SearchBtn>
      </Link>
    </HeaderContainer>
  );
}
