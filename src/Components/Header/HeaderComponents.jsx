import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Gobackbtn from '../Button/GoBackbtn';
import HomeBtn from '../Button/HomeBtn';
import SearchBtn from '../Button/SearchBtn';
import {
  HeaderContainer,
  HeaderFollowContainer,
  ChatUserName,
  HeaderSearchContainer,
} from './HeaderStyle';

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
  const inputFocus = useRef();
  useEffect(() => {
    inputFocus.current.focus();
  });
  return (
    <HeaderSearchContainer>
      <Gobackbtn />
      <input
        type='search'
        placeholder='아이디를 입력하세요'
        onChange={(e) => setSearchText(e.target.value)}
        ref={inputFocus}
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