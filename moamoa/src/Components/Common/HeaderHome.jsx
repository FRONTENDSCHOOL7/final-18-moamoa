import React from 'react';
import styled from 'styled-components';
import iconSearch from '../../Assets/icons/icon-search.svg';
import MOAMOA from '../../Assets/images/MOAMOA.png';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <HeaderContainer>
      <Link to='/home'>
        <HomeBtn src={MOAMOA} alt="홈으로 이동" />
      </Link>
      <Link to='/search'>
        <SearchBtn src={iconSearch}></SearchBtn>
      </Link>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  height: 48px;

  position: fixed;
  min-height: 48px;
  max-height: 48px;
  width: 390px;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;

  img {
    cursor: pointer;
  }
`;

const SearchBtn = styled.img`
  width: 2.2rem;
`;

const HomeBtn = styled.img`
  width: 13rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;