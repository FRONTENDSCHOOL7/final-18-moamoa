import React from 'react';
import Gobackbtn from './GoBackbtn';
import styled from 'styled-components';

export default function Header() {
  return (
    <HeaderContainer>
      <Gobackbtn />
      <input type='text' />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  width: 390px;

  background-color: #fff;
  border-bottom: 2px solid #dbdbdb;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 10px;

  img {
    cursor: pointer;
  }
  input {
    background-color: #f2f2f2;
    width: 316px;
    height: 32px;
    border-radius: 32px;
    padding-left: 20px;
    box-sizing: border-box;
  }
`;
