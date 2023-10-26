import React from 'react';
import Gobackbtn from './GoBackbtn';
import styled from 'styled-components';
import iconSearch from '../../Assets/icons/icon-search.svg';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-evenly;
  height: 55px;
  gap: 65px;
  width: 390px;
  position: fixed;
  background-color: #fff;
  border-bottom: 2px solid #dbdbdb;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  box-sizing: border-box;
  img {
    cursor: pointer;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Gobackbtn />
      <h2>모아모아 축제목록</h2>
      <img src={iconSearch}></img>
    </HeaderContainer>
  );
}
