import React from 'react';
import styled from 'styled-components';
import homeBg from '../../Assets/icons/character-yellow.png';
import { useNavigate } from 'react-router-dom';

export default function HomeFeed() {

  const navigate = useNavigate();

  return (
    <UserSearchHome>
      <HomeCont>
        <SearchText>유저를 검색해 팔로우 해보세요!</SearchText>
        <SearchBtn onClick={()=> {navigate('/search')}}>검색하기</SearchBtn>
      </HomeCont>
    </UserSearchHome>
  );
}
const UserSearchHome = styled.div`
  width: 100%;
  max-width: 39rem;
  height: 100vh;
  background-color: #fff;
  margin: auto;
`;
const HomeCont = styled.div`
  padding-top: 22.8rem;
  height: 20.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: url(${homeBg}) 10.4rem 10.8rem no-repeat;
  background-position: 50% 80%;
`;

const SearchText = styled.p`
  font-size: 1.4rem;
  color: #767676;
`;

const SearchBtn = styled.button`
  width: 12.2rem;
  height: 4.4rem;
  border-radius: 4.4rem;
  font-size: 1.4rem;
  background-color: #87b7e4;
  color: white;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;
