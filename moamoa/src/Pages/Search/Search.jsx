import React, { useEffect, useState } from 'react';
import { Container } from '../../Components/Common/Container';
import UserSearch from '../../Components/Common/HeaderSearch';
import { SearchAPI } from '../../API/Search/SearchAPI';
import styled from 'styled-components';
import Footer from '../../Components/Common/Footer';
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';
import useDebounce from '../../Hooks/Search/useDebounce';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const token = useRecoilValue(userTokenAtom);
  const debounceValue = useDebounce(searchText, 10500);
  const [, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData(debounceValue) {
      console.log(debounceValue);
      try {
        const result = await SearchAPI(token, debounceValue);
        setSearchResults(result);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    if (searchText) {
      fetchData(debounceValue);
    }
  }, [debounceValue]);
  console.log(searchResults);
  const handleUser = (accountname) => {
    navigate(`/profile/${accountname}`);
  };
  return (
    <Container>
      <UserSearch setSearchText={setSearchText}></UserSearch>
      {searchResults && searchResults.length > 0 ? (
        searchResults.slice(0, 5).map((item, index) => (
          <SearchWrap onClick={() => handleUser(item.accountname)} key={index}>
            <SearchPhotoWrap>
              <SearchImg src={item.image} alt='' />
            </SearchPhotoWrap>
            <UserInfo>
              <UserId>{item.username}</UserId>
              <UserText>{item.intro}</UserText>
            </UserInfo>
          </SearchWrap>
        ))
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
      <Footer></Footer>
    </Container>
  );
}
const SearchImg = styled.img`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 50px;
`;
const SearchWrap = styled.div`
  width: 358px;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 0 8px 16px;
`;
const SearchPhotoWrap = styled.div`
  border: 1px solid var(--DBDBDB, #dbdbdb);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const UserInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const UserId = styled.h2`
  font-size: 14px;
`;
const UserText = styled.span`
  color: #767676;
  font-size: 12px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
