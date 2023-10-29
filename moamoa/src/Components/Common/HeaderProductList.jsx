import React from 'react';
import Gobackbtn from './GoBackbtn';
import styled from 'styled-components';
import iconSearch from '../../Assets/icons/icon-search.svg';

export default function Header() {
  return (
    <HeaderContainer>
      <Gobackbtn />
      <h2>모아모아 축제목록</h2>
      <img src={iconSearch}></img>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-evenly;
  height: 48px;
  gap: 65px;
  width: 390px;
  position: fixed;
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
