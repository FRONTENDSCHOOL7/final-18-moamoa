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
import blueBadge from '../../Assets/icons/icon-usertype-check.svg';
import Loader from './Loader';

export default function Search() {
  const navigate = useNavigate();
  const [, setError] = useState(null);
  const token = useRecoilValue(userTokenAtom);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const debounceValue = useDebounce(searchText, 3000);
  const [searchResults, setSearchResults] = useState(null);

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

  const moveToProfile = (accountname) => {
    navigate(`/profile/${accountname}`);
  };
  const officialBlueCheck = (username) => {
    if (username.slice(0, 3) === '[o]') {
      return <BlueCheck src={blueBadge} alt='' />;
    }
    return null;
  };

  return (
    <Container>
      <UserSearch setSearchText={setSearchText}></UserSearch>
      <SearchListWrap>
        {isLoading ? (
          <Loader />
        ) : searchResults && searchResults.length > 0 ? (
          searchResults.slice(0, 5).map((item, index) => {
            const cleanUserId = item.username.replace(/\[i\]|\[o\]/g, '');
            return (
              <SearchWrap onClick={() => moveToProfile(item.accountname)} key={index}>
                <SearchPhotoWrap>
                  <SearchImg src={item.image} alt='' />
                </SearchPhotoWrap>
                <UserInfo>
                  <OfficialContainer>
                    <UserId>{SearchHighLight(cleanUserId, searchText)}</UserId>
                    {officialBlueCheck(item.username)}
                  </OfficialContainer>
                  <UserIntro>{item.intro}</UserIntro>
                </UserInfo>
              </SearchWrap>
            );
          })
        ) : (
          <NotFoundContainer>
            <img src={iconSearchNotFound} alt='' />
            <p>검색 결과가 없습니다.</p>
          </NotFoundContainer>
        )}
      </SearchListWrap>
      <Footer></Footer>
    </Container>
  );
}

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
const UserId = styled.h2`
  font-size: 14px;
`;
const UserIntro = styled.span`
  color: #767676;
  font-size: 12px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const NotFoundContainer = styled.div`
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

const OfficialContainer = styled.div`
  display: flex;
  align-items: center;
  vertical-align: top;
`;
const BlueCheck = styled.img`
  padding-left: 0.3rem;
  width: 1.2rem;
`;
