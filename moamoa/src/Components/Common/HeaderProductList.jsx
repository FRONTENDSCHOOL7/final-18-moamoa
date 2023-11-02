import React from 'react';
import Gobackbtn from './GoBackbtn';
import styled from 'styled-components';
import iconSearch from '../../Assets/icons/icon-search.svg';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <HeaderContainer>
      <Gobackbtn />
      <h2>모아모아 축제목록</h2>
      <Link to='/search'>
        <img src={iconSearch}></img>
      </Link>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-evenly;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  gap: 65px;
  width: 390px;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  align-items: center;
  font-size: 21px;
  font-weight: bold;
  box-sizing: border-box;
  img {
    cursor: pointer;
    align-items: center;
    gap: 5px;
  }
`;
