import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSearchHome, HomeCont, SearchText, SearchBtn } from './HomeStyle';
export default function HomeFeed() {
  const navigate = useNavigate();

  return (
    <UserSearchHome>
      <HomeCont>
        <SearchText>유저를 검색해 팔로우 해보세요!</SearchText>
        <SearchBtn
          onClick={() => {
            navigate('/search');
          }}
        >
          검색하기
        </SearchBtn>
      </HomeCont>
    </UserSearchHome>
  );
}
