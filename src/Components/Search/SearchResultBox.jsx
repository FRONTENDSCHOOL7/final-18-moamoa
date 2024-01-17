import React from 'react';
import RenderUserId from './UserId';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SearchResultBox, SearchPhotoWrap, SearchImg, UserInfo, UserIntro } from './SearchStyle';
export default function SearchResult({ item, index, searchText }) {
  SearchResult.propTypes = {
    item: PropTypes.shape({
      accountname: PropTypes.string,
      image: PropTypes.string,
      intro: PropTypes.string,
    }),
    index: PropTypes.number,
    searchText: PropTypes.string,
  };
  const navigate = useNavigate();
  const moveToProfile = (accountname) => {
    navigate(`/profile/${accountname}`);
  };
  return (
    <SearchResultBox onClick={() => moveToProfile(item.accountname)} key={index}>
      <SearchPhotoWrap>
        <SearchImg src={item.image} alt='' />
      </SearchPhotoWrap>
      <UserInfo>
        <RenderUserId item={item} searchText={searchText} />
        <UserIntro>{item.intro}</UserIntro>
      </UserInfo>
    </SearchResultBox>
  );
}
