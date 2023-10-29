import React from 'react'
import styled from 'styled-components';
import homeBg from '../../Assets/icons/character-yellow.png'

export default function HomeFeed() {
  return (
    <UserSearchHome>      
      <HomeCont>
        <SearchText>유저를 검색해 팔로우 해보세요!</SearchText>
        <SearchBtn>검색하기</SearchBtn>
      </HomeCont>
    </UserSearchHome>
  )
}
const UserSearchHome = styled.div`
  width: 100%;
  height: 100vh;
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
  background-color: #87B7E4;
  color: white;
  font-weight: bold;
  &:hover{
    cursor: pointer;
  }
`;