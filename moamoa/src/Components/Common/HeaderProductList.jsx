import React from 'react';
import Gobackbtn from './GoBackbtn';
import styled from 'styled-components';
import iconSearch from '../../Assets/icons/icon-search.svg';
import { Link } from 'react-router-dom';
import MOAMOA from '../../Assets/images/MOAMOA.png';

export default function Header() {
  return (
    <HeaderContainer>
      <H2>모아모아 축제목록</H2>
      <Gobackbtn /> 
      <Link to='/home'>
        <HomeBtn src={MOAMOA} alt="홈으로 이동" />
      </Link>
      <Link to='/search'>
        <SearchBtn src={iconSearch} />
      </Link>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly;
  height: 48px;

  position: fixed;
  width: 390px;
  background-color: #fff;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;
  align-items: center;
  font-size: 21px;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;

  box-sizing: border-box;
  img {
    cursor: pointer;
    align-items: center;
    gap: 5px;
  }
`;

const H2 = styled.h2`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`
const SearchBtn = styled.img`
  width: 2.2rem;
`;

const HomeBtn = styled.img`
  width: 13rem;
  margin-top: 0.3rem;
`;