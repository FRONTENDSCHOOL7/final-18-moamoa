import React from 'react';
import styled from 'styled-components';
import RenderUserId from './UserId';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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
const SearchResultBox = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const SearchPhotoWrap = styled.div`
  border: 1px solid var(--DBDBDB, #dbdbdb);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;
const SearchImg = styled.img`
  width: 50px;
  height: 50px;
`;

const UserInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const UserIntro = styled.span`
  color: #767676;
  font-size: 12px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
