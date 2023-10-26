import React from 'react';
import Gobackbtn from './GoBackbtn';
import styled from 'styled-components';
import ButtonSubmit from '../Common/Button';

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
  const onClickHandler = () => {
    console.log('콘솔 찍었지롱~');
  };
  return (
    <HeaderContainer>
      <Gobackbtn />
      <ButtonSubmit buttonText='저장' onClickHandler={onClickHandler} />
    </HeaderContainer>
  );
}
