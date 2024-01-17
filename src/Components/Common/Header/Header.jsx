import React from 'react';
import PropTypes from 'prop-types';
import {
  HeaderChatRoomChange,
  HeaderChatRoomFixed,
  HeaderFollow,
  HeaderHome,
  HeaderSearch,
  HeaderSubmitProduct,
} from './HeaderComponents';
import HeaderKebab from './HeaderKebab';

export default function Header({ type, setSearchText }) {
  Header.propTypes = {
    type: PropTypes.string,
    setSearchText: PropTypes.func,
  };
  switch (type) {
    case 'home':
      return <HeaderHome />;
    case 'moreKebab':
      return <HeaderKebab />;
    case 'follow':
      return <HeaderFollow></HeaderFollow>;
    case 'chatFixedUser':
      return <HeaderChatRoomFixed></HeaderChatRoomFixed>;
    case 'chatChangeUser':
      return <HeaderChatRoomChange></HeaderChatRoomChange>;
    case 'search':
      return <HeaderSearch setSearchText={setSearchText}></HeaderSearch>;
    case 'submitProduct':
      return <HeaderSubmitProduct></HeaderSubmitProduct>;
    default:
      return <HeaderHome />;
  }
}