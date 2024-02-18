import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSearchHome, HomeCont, SearchText, SearchBtn, LoadingCont, LoadingImg } from './HomeStyle';
import loading from '../../Assets/images/loading.gif'

export default function HomeFeed() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  setTimeout(()=>{
    setIsLoading(true);
  }, 500);

  return (
    <>
      {isLoading? <UserSearchHome>
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
      </UserSearchHome>: <LoadingCont><LoadingImg src={loading} alt="로딩중입니다." /></LoadingCont>}
    </>
  );
}
