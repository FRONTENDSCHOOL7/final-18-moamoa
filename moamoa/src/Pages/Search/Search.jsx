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
import SearchHighLight from '../../Components/Common/SearchHighLight';
import iconSearchNotFound from '../../Assets/icons/icon-searchNotFound.svg';

import Loader from './Loader';
export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const token = useRecoilValue(userTokenAtom);
  const debounceValue = useDebounce(searchText, 3000);
  const [, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancel = false;

    async function fetchData(debounceValue) {
      setIsLoading(true);

      try {
        const result = await SearchAPI(token, debounceValue);
        if (!cancel) {
          setSearchResults(result);
          setIsLoading(false);
        }
      } catch (error) {
        if (!cancel) {
          setError(error);
          setIsLoading(false);
          console.error(error);
        }
      }
    }

    if (searchText) {
      fetchData(debounceValue);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }

    return () => {
      cancel = true;
      setSearchResults(null);
    };
  }, [debounceValue, searchText, token]);

  useEffect(() => {
    setSearchResults(null);
  }, [searchText]);

  console.log(searchResults);
  const handleUser = (accountname) => {
    navigate(`/profile/${accountname}`);
  };
  return (
    <Container>
      <UserSearch setSearchText={setSearchText}></UserSearch>
      <SearchListWrap>
        {isLoading ? (
          <Loader />
        ) : searchResults && searchResults.length > 0 ? (
          searchResults.slice(0, 5).map((item, index) => {
            const cleanedUserId = item.username.replace(/\[i\]|\[o\]/g, '');

            return (
              <SearchWrap onClick={() => handleUser(item.accountname)} key={index}>
                <SearchPhotoWrap>
                  <SearchImg src={item.image} alt='' />
                </SearchPhotoWrap>
                <UserInfo>
                  <UserId>{SearchHighLight(cleanedUserId, searchText)}</UserId>
                  <UserText>{item.intro}</UserText>
                </UserInfo>
              </SearchWrap>
            );
          })
        ) : (
          <NotFoundWrap>
            <img src={iconSearchNotFound} alt='' />
            <p>검색 결과가 없습니다.</p>
          </NotFoundWrap>
        )}
      </SearchListWrap>
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

const SearchListWrap = styled.div`
  margin-top: 48px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SearchWrap = styled.div`
  width: 358px;
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
const NotFoundWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  img {
    width: 120px;
    margin-block: 60px 20px;
    transform: translateX(-5%);
  }
  p {
    font-size: 20px;
    transform: translateX(5%);
    color: #919191;
  }
`;
