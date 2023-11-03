import React from 'react';
import Gobackbtn from './GoBackbtn';
import styled from 'styled-components';
import iconSearch from '../../Assets/icons/icon-search.svg';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <HeaderContainer>
      <Gobackbtn />
      <Link to='/search'>
        <img src={iconSearch}></img>
      </Link>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  height: 48px;

  width: 390px;
  justify-content: space-between;
  position: fixed;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  margin: 0 auto;

  img {
    cursor: pointer;
  }
`;
