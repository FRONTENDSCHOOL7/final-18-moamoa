import React from 'react';
import styled from 'styled-components';
import iconSearch from '../../Assets/icons/icon-search.svg';

const HeaderContainer = styled.header`
  display: flex;
  height: 55px;
  width: 390px;
  justify-content: space-between;
  position: fixed;
  border-bottom: 2px solid #dbdbdb;
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

export default function Header() {
  return (
    <HeaderContainer>
      <h1>모아모아 피드</h1>
      <img src={iconSearch}></img>
    </HeaderContainer>
  );
}
