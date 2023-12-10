import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Gobackbtn from './GoBackbtn';
import HomeBtn from './HomeBtn';
import SearchBtn from './SearchBtn';

export function HeaderHome() {
  return (
    <HeaderContainer>
      <Gobackbtn />
      <HomeBtn />
      <SearchBtn />
    </HeaderContainer>
  );
}
export function HeaderChatList() {
  return (
    <HeaderContainer>
      <Gobackbtn />
      <HomeBtn />
      <SearchBtn />
    </HeaderContainer>
  );
}

export function HeaderProductList() {
  return (
    <HeaderContainer>
      <Gobackbtn />
      <HomeBtn />
      <SearchBtn />
    </HeaderContainer>
  );
}

export function HeaderFollow() {
  const address = window.location.pathname;
  let title = address.split('/').pop();
  const upperTitle = title.charAt(0).toUpperCase() + title.slice(1);
  return (
    <HeaderFollowContainer>
      <Gobackbtn />
      <h1>{upperTitle}</h1>
    </HeaderFollowContainer>
  );
}

export function HeaderChatRoomFixed() {
  const address = window.location.pathname;
  const addressUserName = address.split('/').pop();

  let userName;
  const users = [
    { id: 'kim', name: '양떼목장 김사장' },
    { id: 'darkHorse', name: '승마체험 곽사장' },
    { id: 'sumiDad', name: '텃밭체험 수미아빠' },
  ];
  console.log(addressUserName);
  for (const user of users) {
    if (user.id === addressUserName) {
      userName = user.name;
      break;
    }
  }

  return (
    <HeaderContainer>
      <Gobackbtn />
      <ChatUserName>{userName}</ChatUserName>
      <SearchBtn />
    </HeaderContainer>
  );
}
export function HeaderChatRoomChange() {
  const address = window.location.pathname;
  const addressUserName = address.split('/').pop();
  const KoreaName = decodeURIComponent(addressUserName);
  console.log(address);
  return (
    <HeaderContainer>
      <Gobackbtn />
      <ChatUserName>{KoreaName}</ChatUserName>
      <SearchBtn />
    </HeaderContainer>
  );
}
export function HeaderSearch({ setSearchText }) {
  HeaderSearch.propTypes = {
    setSearchText: PropTypes.func,
  };
  return (
    <HeaderSearchContainer>
      <Gobackbtn />
      <input
        type='search'
        placeholder='아이디를 입력하세요'
        onChange={(e) => setSearchText(e.target.value)}
      />
    </HeaderSearchContainer>
  );
}

export function HeaderSubmitProduct() {
  return (
    <HeaderContainer>
      <Gobackbtn />
      <HomeBtn />
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
  z-index: 5;

  img {
    cursor: pointer;
  }
`;
const HeaderFollowContainer = styled.div`
  display: flex;
  height: 48px;
  position: fixed;
  min-height: 48px;
  max-height: 48px;
  width: 390px;
  gap: 8px;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  align-items: center;
  font-size: 16px;
  padding-left: 16px;
  box-sizing: border-box;
  margin-bottom: 8px;
`;
const ChatUserName = styled.h2`
  font-weight: 500;
  font-size: 1.8rem;
`;
const HeaderSearchContainer = styled.header`
  display: flex;
  justify-content: space-around;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  width: 390px;

  position: fixed;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 10px;

  img {
    cursor: pointer;
    padding-right: 14px;
    padding-bottom: 2px;
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
