import React from 'react';
import Gobackbtn from './GoBackbtn';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-evenly;
  height: 55px;
  gap: 13px;
  width: 390px;
  position: fixed;
  background-color: #fff;
  border-bottom: 2px solid #dbdbdb;
  align-items: center;
  box-sizing: border-box;
  /* padding-left: 15px; */
  img {
    cursor: pointer;
  }
  input {
    background-color: #f2f2f2;
    width: 320px;
    height: 32px;
    border-radius: 32px;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Gobackbtn />
      <input type='text' />
    </HeaderContainer>
  );
}
